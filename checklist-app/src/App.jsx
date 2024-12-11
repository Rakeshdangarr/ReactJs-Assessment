import React, { useState, createContext, useContext } from "react";

// Context to manage global state (optional for small apps like this)
const ChecklistContext = createContext();

const ChecklistProvider = ({ children }) => {
  const [checklist, setChecklist] = useState({
    citizen: false,
    over21: false,
  });

  const updateChecklist = (key, value) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ChecklistContext.Provider value={{ checklist, updateChecklist }}>
      {children}
    </ChecklistContext.Provider>
  );
};

const ChecklistDisplay = () => {
  const { checklist } = useContext(ChecklistContext);
  return (
    <div>
      <p>Are you a Citizen: {checklist.citizen ? "Yes" : "No"}</p>
      <p>Are you over 21: {checklist.over21 ? "Yes" : "No"}</p>
    </div>
  );
};

const ChecklistForm = () => {
  const { checklist, updateChecklist } = useContext(ChecklistContext);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    updateChecklist(name, checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="citizen"
          checked={checklist.citizen}
          onChange={handleChange}
        />
        Are you a Citizen?
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="over21"
          checked={checklist.over21}
          onChange={handleChange}
        />
        Are you over 21?
      </label>
    </div>
  );
};

const App = () => {
  return (
    <ChecklistProvider>
      <div style={{ fontFamily: "Arial", padding: "20px" }}>
        <h1>Checklist Example</h1>
        <ChecklistForm />
        <ChecklistDisplay />
      </div>
    </ChecklistProvider>
  );
};

export default App;