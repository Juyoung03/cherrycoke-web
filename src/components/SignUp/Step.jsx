import "./Step.css";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const Step = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phnum: "",
        id: "",
        pw: "",
        pw_valid: "",
        service_agree: false,
    });

    const updateFromData = (data) => {
        setFormData(prev => ({...prev, ...data}));
        setStep(prev => prev + 1);
        // console.log(formData);
    }

    return (
        <div>
            {step === 1 && <Step1 onNext={updateFromData} />}
            {step === 2 && <Step2 onNext={updateFromData} />}
            {step === 3 && <Step3 onNext={updateFromData} />}
            {step === 4 && <Step4 onNext={updateFromData} data={formData} />}
        </div>
    )
}

export default Step;