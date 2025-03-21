type StartFormProps = {
    name: string;
    setName: (name: string) => void;
    hours: number;
    setHours: (hours: number) => void;
    minutes: number;
    setMinutes: (minutes: number) => void;
    onStart: () => void;
};

export default function StartForm({
                                      name,
                                      setName,
                                      hours,
                                      setHours,
                                      minutes,
                                      setMinutes,
                                      onStart,
                                  }: StartFormProps) {
    return (
        <div className="space-y-6 mb-6 w-full max-w-xs text-left">
            {/* Name Field */}
            <div className="space-y-1">
                <label className="block text-pink-500 font-semibold text-lg">Name</label>
                <input
                    type="text"
                    placeholder="Wie heißt Du?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 rounded-full border border-pink-300 w-full text-gray-700 placeholder-gray-500 text-lg text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
            </div>

            {/* Time Fields */}
            <div className="space-y-1">
                <label className="block text-purple-500 font-semibold text-lg">Zeit</label>
                <div className="flex space-x-2">
                    {/* Hours Input */}
                    <div className="flex flex-col w-1/2 space-y-1">
                        <input
                            type="number"
                            min={0}
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                            className="px-3 py-2 rounded-full border border-purple-300 text-gray-700 placeholder-gray-500 text-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Stunden"
                        />
                        <span className="text-sm text-purple-400 text-center">Stunden</span>
                    </div>

                    {/* Minutes Input */}
                    <div className="flex flex-col w-1/2 space-y-1">
                        <input
                            type="number"
                            min={0}
                            max={59}
                            value={minutes}
                            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                            className="px-3 py-2 rounded-full border border-purple-300 text-gray-700 placeholder-gray-500 text-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Minuten"
                        />
                        <span className="text-sm text-purple-400 text-center">Minuten</span>
                    </div>
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={onStart}
                className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full w-full transition duration-200"
            >
                Los geht's!
            </button>
        </div>
    );
}
