export let layerOpenedState = $state({ id: 0 });

export function setLayerOpenedState(id: number) {
  layerOpenedState.id = id;
}
