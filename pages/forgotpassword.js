import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

// --- validators ---
const requiredValidator = (value) =>
    value ? "" : "This field is required.";

const emailValidator = (value) => {
    if (!value) {
        return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address.";
};

// --- custom input with error display ---
const FormInput = (fieldRenderProps) => {
    const { validationMessage, visited, label, ...others } = fieldRenderProps;

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <Input
                {...others}
                className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {visited && validationMessage && (
                <div className="text-red-600 text-sm mt-1">{validationMessage}</div>
            )}
        </div>
    );
};

export default function Login() {
    const handleSubmit = async (dataItem) => {
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: dataItem.email }),
            });

            // Check if response is OK
            if (!res.ok) {
                const text = await res.text(); // fallback if not JSON
                throw new Error(`Request failed: ${res.status} - ${text}`);
            }

            const result = await res.json(); // only parse JSON if OK
            console.log("API result:", result);

            if (result.Success) {
                alert("reset password link sent successful ✅");
                window.location.href = "/Login";
            } else {
                alert("Mail Sent failed: " + (result.Message || "Invalid Email"));
            }
        } catch (error) {
            console.error("Forgot Password error:", error);
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
                {/* Left Panel */}
                <div className="hidden w-1/3 bg-blue-600 p-8 text-white md:flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Forgot Password</h2>
                    <p className="mt-4 text-blue-100">
                        We'll email you instructions to reset your password.
                    </p>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-8 md:p-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">Forgot Password</h2>

                    <Form
                        onSubmit={handleSubmit}
                        render={(formRenderProps) => (
                            <FormElement>
                                {/* Email */}
                                <Field
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    component={FormInput}
                                    validator={(value) =>
                                        requiredValidator(value) || emailValidator(value)
                                    }
                                />
                                {/* Submit */}
                                <Button
                                    type="submit"
                                    themeColor="primary"
                                    className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                    disabled={!formRenderProps.allowSubmit}
                                >
                                    Submit
                                </Button>
                            </FormElement>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
