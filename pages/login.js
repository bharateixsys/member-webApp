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
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: dataItem.email, password: dataItem.password }),
            });
            // Check if response is OK
            if (!res.ok) {
                const text = await res.text(); // fallback if not JSON
                throw new Error(`Request failed: ${res.status} - ${text}`);
            }

            const result = await res.json(); // only parse JSON if OK
            console.log("API result:", result.Data.AccessToken);

            if (result.Success) {
                //alert("Login successful ✅");
                const token = result.Data.AccessToken;
                console.log("token", token);
                localStorage.setItem("authToken", token);
                localStorage.setItem("token", token);
                localStorage.setItem("userId", result.Data.UserId)
                localStorage.setItem("username", result.Data.UserName)
                localStorage.setItem("memberId", result.Data.MemberId)
                console.log("login token", localStorage.getItem("authToken"));
                window.location.href = "/tool/idcard";
            } else {
                alert("Login failed: " + (result.Message || "Invalid credentials"));
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.\n" + error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
                {/* Left Panel */}
                <div className="hidden w-1/3 bg-blue-600 p-8 text-white md:flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Welcome Back!</h2>
                    <p className="mt-4 text-blue-100">
                        Login to access your dashboard and manage your account.
                    </p>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-8 md:p-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>

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

                                {/* Password */}
                                <Field
                                    name="password"
                                    type="password"
                                    label="Password"
                                    component={FormInput}
                                    validator={requiredValidator}
                                />

                                {/* Remember Me + Forgot Password */}
                                <div className="mb-6 flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                        <Field
                                            name="rememberMe"
                                            type="checkbox"
                                            component="input"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        Remember me
                                    </label>
                                    <a
                                        href="/ForgotPassword"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    themeColor="primary"
                                    className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                    disabled={!formRenderProps.allowSubmit}
                                >
                                    Login
                                </Button>
                            </FormElement>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
