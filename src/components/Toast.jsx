import { useEffect } from "react";

function Toast({ message, type, onClose }) {

    useEffect(() => {

        if (!message) return;

        const timer = setTimeout(onClose, 2500);

        return () => clearTimeout(timer);

    }, [message, onClose]);

    if (!message) return null;

    return (

        <div className={`toast ${type}`}>

            {message}

        </div>

    );

}

export default Toast;   