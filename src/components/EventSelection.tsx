import React from 'react';

interface EventSelectionProps {
  selectedEvents: string[];
  onEventsChange: (events: string[]) => void;
}

export function EventSelection({ selectedEvents, onEventsChange }: EventSelectionProps) {
  const events = [
    'Script Mania - Paper Presentation',
    'Script Mania - Paper Presentation (Same author presenting 2 Papers)',
    'You Think - Technical Quiz',
    'Build Machine - Engine Assembly',
    'Death Valley - Robo Race',
    'Death Valley - Robo Race (Second BOT)',
    'Yantrayuddha - Robo War',
    'Yantrayuddha - Robo War (Second BOT)'
  ];

  const calculateTotal = () => {
    const count = selectedEvents.length;
    if (count === 0) return 0;
    if (count === 1) return 400;
    if (count === 2) return 700;
    if (count === 3) return 900;
    return 900 + (count - 3) * 300;
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedEvents = checked
      ? [...selectedEvents, value]
      : selectedEvents.filter(e => e !== value);
    onEventsChange(updatedEvents);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Select Events *</h3>
        <p className="text-sm text-gray-500 mt-1">
          ₹ 400/- For Single Event<br />
          ₹ 700/- For Two Events<br />
          ₹ 900/- For Three Events<br />
          ₹ 300/- For each extra Event (exceeding 3 Events)
        </p>
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <label key={event} className="flex items-start">
            <input
              type="checkbox"
              value={event}
              checked={selectedEvents.includes(event)}
              onChange={handleEventChange}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">{event}</span>
          </label>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-sm font-medium text-gray-900">
          Total Amount: ₹{calculateTotal()}/-
        </p>
      </div>
    </div>
  );
}