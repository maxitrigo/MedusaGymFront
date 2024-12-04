interface ConfirmationCircleProps {
    confirmed: boolean; // true para confirmado (verde), false para no confirmado (rojo)
}

const ConfirmationCircle: React.FC<ConfirmationCircleProps> = ({ confirmed }) => {
    return (
        <div className="flex justify-center items-center h-[500px]">
            <div
                className={`w-32 h-32 flex justify-center items-center rounded-full ${
                    confirmed ? "bg-green-500" : "bg-red-500"
                } animate-bounce`}
            >
                {confirmed ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-16 h-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-16 h-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default ConfirmationCircle;
