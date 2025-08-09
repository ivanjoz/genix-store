<script lang="ts">
  import s1 from "./core.module.css";

  export interface IInput {
    id?: number;
    saveOn: any;
    save: string;
    label?: string;
    css?: string;
    inputCss?: string;
    required?: boolean;
    validator?: (v: string | number) => boolean;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: () => void;
    postValue?: any;
    baseDecimals?: number;
    content?: string | any;
    transform?: (v: string | number) => string | number;
    useTextArea?: boolean;
    rows?: number;
  }

  const {
    id,
    saveOn,
    save,
    label,
    css,
    inputCss,
    required,
    validator,
    type,
    placeholder,
    disabled,
    onChange,
    postValue,
    baseDecimals,
    content,
    transform,
    useTextArea,
    rows,
  }: IInput = $props();

  // Shared reactive state
  let inputUpdater = $state(new Map<number, number>());

  export function refreshInput(ids: number[]) {
    const map = new Map(inputUpdater);
    for (let id of ids) {
      const currentValue = map.get(id) || 0;
      map.set(id, currentValue + 1);
    }
    inputUpdater = map;
  }

  const baseDecimalsValue = baseDecimals ? 10 ** baseDecimals : 0;
  let inputValue = $state("" as string | number);
  let isInputValid = $state(checkIfInputIsValid());
  let isChange = 0;

  function checkIfInputIsValid(): number {
    if (!required || disabled) return 0;
    if (!saveOn || !save) return 1;
    const value = saveOn[save] as string | number;

    let pass = !required;
    if (validator) {
      pass = validator(value);
    } else {
      if (value || value === 0) pass = true;
    }
    return pass ? 2 : 1;
  }

  function onKeyUp(ev: KeyboardEvent, isBlur?: boolean) {
    ev.stopPropagation();
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement;
    let value: string | number = target.value;

    if (type === "number") {
      if (!isBlur && !value && ev.key === "-") return;
      if (isNaN(value as number)) {
        value = undefined as any;
      } else {
        value = parseFloat(value as string);
        if (baseDecimalsValue) value = Math.round(value * baseDecimalsValue);
      }
    }

    if (transform && isBlur) {
      value = transform(value);
    }

    if (saveOn && save) {
      saveOn[save] = value as any;
      isInputValid = checkIfInputIsValid();
    }
    inputValue = value;
  }

  function iconValid() {
    if (!isInputValid) return null;
    else if (isInputValid === 2)
      return `<i class="v-icon icon-ok c-green"></i>`;
    else if (isInputValid === 1)
      return `<i class="v-icon icon-attention c-red"></i>`;
    return null;
  }

  function getValue() {
    if (typeof inputValue !== "number") return inputValue || "";
    return baseDecimalsValue
      ? (inputValue as number) / baseDecimalsValue
      : inputValue;
  }

  $effect(() => {
    const updaterVal = id ? inputUpdater.get(id) || 0 : 0;
    updaterVal; // dependency
    const v = saveOn[save];
    inputValue = typeof v === "number" ? v : (v as string) || "";
    isInputValid = checkIfInputIsValid();
  });

  let cN = $derived(`${s1.input} p-rel` + (css ? " " + css : ""));
</script>

<div class={cN}>
  {#if label}
    <div class={s1.input_lab}>
      {label}{@html iconValid() || ""}
    </div>
    <div class={s1.input_lab1}>
      {label}{@html iconValid() || ""}
    </div>
  {/if}

  <div class={`${s1.input_div} w100`}>
    {#if useTextArea}
      <textarea
        class={`${s1.input_inp} ${inputCss || ""}`}
        bind:value={inputValue}
        placeholder={placeholder || ""}
        {disabled}
        {rows}
        onkeyup={(ev) => {
          onKeyUp(ev);
          isChange++;
        }}
        onblur={(ev) => {
          onKeyUp(ev, true);
          if (onChange && isChange) {
            onChange();
            isChange = 0;
          }
        }}
      ></textarea>
    {:else}
      <input
        class={`${s1.input_inp} ${inputCss || ""}`}
        bind:value={inputValue}
        type={type || "text"}
        placeholder={placeholder || ""}
        {disabled}
        onkeyup={(ev) => {
          onKeyUp(ev);
          isChange++;
        }}
        onblur={(ev) => {
          onKeyUp(ev, true);
          if (onChange && isChange) {
            onChange();
            isChange = 0;
          }
        }}
      />
    {/if}

    {#if !label}
      {@html iconValid() || ""}
    {/if}
    {#if postValue}
      {postValue}
    {/if}
  </div>
</div>
