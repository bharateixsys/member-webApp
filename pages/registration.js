import { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";

const requiredValidator = (value) => (value ? "" : "This field is required.");
const emailValidator = (value) =>
    !value
        ? "Email is required."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Please enter a valid email address.";
const phoneValidator = (value) =>
    !value
        ? "Phone is required."
        : /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
            ? ""
            : "Please enter a valid phone number.";

const FormInput = (fieldRenderProps) => {
    const {
        validationMessage,
        visited,
        label,
        placeholder,
        value,
        onChange,
        onBlur,
        type,
        formSubmitted,
    } = fieldRenderProps;

    const showError = (visited || formSubmitted) && validationMessage;

    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <Input
                type={type || "text"}
                value={value || ""}
                onChange={(e) => onChange({ value: e.target.value })}
                onBlur={onBlur}
                placeholder={placeholder}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {showError && <div className="text-red-600 text-sm mt-1">{validationMessage}</div>}
        </div>
    );
};


export default function Registration() {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState("Yourself"); // ✅ default selected
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => setSelected(value);

    const handleNext = (formRenderProps) => {
        setFormSubmitted(true); // force all errors to show

        const step1Fields = ["firstName", "lastName", "memberId", "last4SSN", "dob", "phone", "email"];
        const isValid = step1Fields.every(
            (field) => !formRenderProps.errors || !formRenderProps.errors[field]
        );

        if (isValid) {
            setFormSubmitted(false);
            setStep(2);
        }
    };

    const handlePrev = () => step > 1 && setStep(step - 1);


    const handleSubmit = async (dataItem) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: dataItem.email,
                    registerfor: dataItem.registerfor,
                    email: dataItem.email,
                    firstName: null,
                    lastName: null,
                    password: dataItem.password,
                    memberId: dataItem.memberId,
                    last4SSN: dataItem.last4SSN,
                    birthDate: dataItem.birthDate,
                    phone: dataItem.phone,
                    zipCode: dataItem.zipCode,
                    // role:dataItem.role
                    role: "member"
                }),
            });

            const result = await res.json();
            // Check if response is OK
            if (!res.ok) {
                const text = await res.text(); // fallback if not JSON
                throw new Error(`Request failed: ${res.status} - ${text}`);
            }

            if (result.Success) {
                alert("Register Member Successfull.");
                window.location.href = "/Login";
            } else {
                alert("Registration Fail: " + (result.Message || "Registration not done"));
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl my-8">
                {/* Sidebar Steps */}
                <div className="w-1/3 bg-blue-600 p-6 text-white">
                    <div
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer ${step === 1 ? "bg-white text-blue-600 font-bold" : ""
                            }`}
                        onClick={() => setStep(1)}
                    >
                        <span>Member Info</span>
                    </div>
                    <hr className="my-4 border-white/40" />
                    <div
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer ${step === 2 ? "bg-white text-blue-600 font-bold" : ""
                            }`}
                        onClick={() => setStep(2)}
                    >
                        <span>Password Info</span>
                    </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 p-8">
                    <Form
                        onSubmit={handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                {/* STEP 1 */}
                                {step === 1 && (
                                    <div className="animate-fadeIn">
                                        {/* Radio buttons */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Who are you registering?
                                            </label>
                                            <div className="flex gap-4">
                                                {["Yourself", "Your Dependent (Under 18)"].map((option) => (
                                                    <label
                                                        key={option}
                                                        className={`px-4 py-2 border-2 rounded-lg cursor-pointer transition ${selected === option
                                                                ? "bg-blue-600 text-white border-blue-600"
                                                                : "border-blue-600 text-blue-600"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="role"
                                                            value={option}
                                                            checked={selected === option}
                                                            onChange={() => handleChange(option)}
                                                            className="hidden"
                                                        />
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fields */}
                                        <Field
                                            name="firstName"
                                            label="First Name"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="lastName"
                                            label="Last Name"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="memberId"
                                            label="Member ID"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="last4SSN"
                                            label="Last 4 SSN"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="dob"
                                            label="Date of Birth"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                            type="date"
                                        />
                                        <Field
                                            name="zip"
                                            label="Zip Code"
                                            component={FormInput}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="phone"
                                            label="Phone"
                                            component={FormInput}
                                            validator={(value) => requiredValidator(value) || phoneValidator(value)}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="email"
                                            label="Email"
                                            component={FormInput}
                                            validator={(value) => requiredValidator(value) || emailValidator(value)}
                                            formSubmitted={formSubmitted}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleNext(formRenderProps)}
                                            className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}

                                {/* STEP 2 */}
                                {step === 2 && (
                                    <div className="animate-fadeIn">
                                        <h2 className="mb-6 text-xl font-bold text-gray-800">
                                            Password Information
                                        </h2>

                                        <Field
                                            name="username"
                                            label="Username"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="password"
                                            label="Password"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            type="password"
                                            formSubmitted={formSubmitted}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            component={FormInput}
                                            validator={requiredValidator}
                                            type="password"
                                            formSubmitted={formSubmitted}
                                        />

                                        <div className="mt-6 flex justify-between">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                            >
                                                ← Previous
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                                disabled={loading}
                                            >
                                                {loading && (
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    />
                                                )}
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </FormElement>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
