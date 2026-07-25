function AlertsPanel() {

  return (
    <div
      className="
        glass
        rounded-3xl
        p-6
      "
    >
      <h2 className="text-xl font-bold">
        Weather Alerts
      </h2>

      <div
        className="
          mt-4
          p-4
          rounded-xl
          bg-yellow-500/20
        "
      >
        No active alerts
      </div>
    </div>
  );
}

export default AlertsPanel;
