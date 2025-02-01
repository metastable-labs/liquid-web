import * as yup from "yup";

const schema = yup.object().shape({
  agentName: yup.string().required("Username is required"),
  agentDeveloperID: yup.string().required("Developer ID is required"),
});

export default schema;
