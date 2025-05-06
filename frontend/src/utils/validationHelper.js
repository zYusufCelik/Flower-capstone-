export const validateProcesses = (processes) => {
  const errors = [];

  processes.forEach((process, index) => {
    const { processName, shape, time, distance, valueAdded, nonValueAdded } = process;

    // 1. Process Name zorunlu
    if (!processName || processName.trim() === "") {
      errors.push(`Step ${index + 1}: Step Name is required.`);
    }

    // 2. Arrow için sadece Distance dolu olmalı
    if (shape === "arrow") {
      if (!distance || Number(distance) <= 0) {
        errors.push(`Step ${index + 1}: Distance is required for Transportation (arrow) shape.`);
      }
      if (time && Number(time) > 0) {
        errors.push(`Step ${index + 1}: Time should be empty for Transportation (arrow) shape.`);
      }
    }
    // 3. Diğer şekiller için sadece Time dolu olmalı
    else {
      if (!time || Number(time) <= 0) {
        errors.push(`Step ${index + 1}: Time is required for shape "${shape}".`);
      }
      if (distance && Number(distance) > 0) {
        errors.push(`Step ${index + 1}: Distance should be empty for shape "${shape}".`);
      }
    }

    // 4. Value Added veya Non Value Added seçilmeli
    if (!valueAdded && !nonValueAdded) {
      errors.push(`Step ${index + 1}: Either Value Added or Non Value Added must be selected.`);
    }
  });

  return errors;
};
