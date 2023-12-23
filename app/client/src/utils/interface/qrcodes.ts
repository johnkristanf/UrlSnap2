
export interface SetselectedQrCodeOption {
    setselectedQrCodeOption: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void); 
}

export interface SelectedQrCodeOption {
    selectedQrCodeOption: React.Dispatch<React.SetStateAction<string>> | string; 
}