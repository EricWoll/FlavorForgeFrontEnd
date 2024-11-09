import { Dispatch, SetStateAction } from 'react';

export interface INavBarContext {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<SetStateAction<boolean>>;
    isWindowLarge: boolean;
}
