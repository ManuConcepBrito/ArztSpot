export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_DOCTOR":
      return {
        ...state,
        doctor: action.payload,
      };
    case "SET_SELECTED_APPOINTMENT":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "SET_POSSIBLE_SLOTS":
      return {
        ...state,
        slots: action.payload,
      };
    case "SET_APPOINTMENT_CREATED":
      return {
        ...state,
        appointmentCreated: action.payload
      }
    case "CREATE_APPOINTMENT":
      return {
        ...state,
        appointment: action.payload
      }
    case "CLEAR_SELECTED_DATE":
      return {
        ...state,
        selectedDate: {
          day: null,
          timeSlot: null,
        },
      };
    case "CLEAR_SLOTS":
      return {
        ...state,
        slots: [
          {
            time: null,
            appointmentTaken: false,
          },
        ],
      };
    case "DOCTOR_ERROR_404":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload.alert,
        alertMsg: action.payload.alertMsg
      };
    case "SET_SELECTED_SYMPTOMS":
      return {
        ...state,
        selectedSymptoms: action.payload,
      };
    case "SET_ALL_SYMPTOMS":
      return {
        ...state,
        allSymptoms: action.payload,
      }
    default:
      return state;
  }
};
