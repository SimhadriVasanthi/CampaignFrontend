import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (error: any) => void;
}
const qrcodeRegionId = "reader__scan_region";
const createConfig = (props: Html5QrcodePluginProps) => {
    const config: any = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;
        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required callback.");
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner.", error);
            });
        };
         // eslint-disable-next-line
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;
