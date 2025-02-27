import { KeystrokeAction, KeystrokeType, SCANCODES } from './';

let scancodeMap: Map<number, any>;

export function isScancodeExists(scancode: number): boolean {
    if (!scancodeMap) {
        fillScancodeMap();
    }

    return scancodeMap.has(scancode);
}

export function isAllowedScancode(keyAction: KeystrokeAction): boolean {
    if (isScancodeExists(keyAction.scancode)) {
        return true;
    }

    switch (keyAction.type) {
        case KeystrokeType.system:
        case KeystrokeType.basic:
            return keyAction.scancode > 0 && keyAction.scancode < 256;

        case KeystrokeType.longMedia:
        case KeystrokeType.shortMedia:
            return keyAction.scancode > 0 && keyAction.scancode < 65566;

        default:
            return false;
    }
}

function fillScancodeMap(): void {
    scancodeMap = new Map<number, any>();

    for (const scanGroup of SCANCODES) {
        for (const child of scanGroup.children) {
            if (child.additional && child.additional.scancode) {
                scancodeMap.set(child.additional.scancode, child);
            }
            else {
                scancodeMap.set(Number.parseInt(child.id), child);
            }
        }
    }
}
