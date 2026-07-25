export const formatDate = (
  dateString
) => {
  return new Date(
    dateString
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
};

export const formatTime = (
  dateString
) => {
  return new Date(
    dateString
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const getAQIColor = (value) => {
  if (value <= 25)
    return "text-green-500";

  if (value <= 50)
    return "text-yellow-500";

  if (value <= 100)
    return "text-orange-500";

  return "text-red-500";
};
