export interface WallConfig {
  blockSize: number;
  gapSize: number;
}

export const WALL_CONFIG: WallConfig = {
  blockSize: 1.0,
  gapSize: 0.08,
};

export function getResponsiveGrid(width: number, height: number) {
  const aspect = width / height;
  const step = WALL_CONFIG.blockSize + WALL_CONFIG.gapSize;
  const cameraZ = aspect < 1.0 ? 19.0 : 15.0;
  const fov = 48;
  const visibleH = 2 * Math.tan(((fov * Math.PI) / 180) / 2) * cameraZ;
  const visibleW = visibleH * aspect;
  return {
    cols: Math.max(Math.ceil(visibleW / step) + 4, 16),
    rows: Math.max(Math.ceil(visibleH / step) + 4, 16),
    cameraZ,
    fov,
    step,
  };
}
