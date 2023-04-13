import { FC, ReactNode, useContext } from "react";
import { Grid } from "@mui/material";
import { ApiClient } from "../../../apis";
import { MedicContext } from "../../../context/medic";
import { Medic } from "../../../interfaces";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  children?: ReactNode;
  type: string;
  text: string;
}

export const AddDocumentMedicProfile: FC<Props> = ({ type, text }) => {
    const { medic, updateMedic } = useContext(MedicContext);

    const upload = async (type: string, target: any) => {
        if (target.files) {
          try {
            const file = target.files[0];
            const formData = new FormData();
            formData.append("pdf", file);
            formData.append("id", medic._id);
            formData.append("type", type);
            const { data } = await ApiClient.post("/upload", formData);
            if (medic._id) {
              await updateMedic(medic?._id, {
                ...(medic as Medic),
                [type]: data.message,
                ["to_approve"]: true
              });
            }
          } catch (error) {
            console.log({ error });
          }
        }
      };
  return (
    <Grid item xs={12} display="flex" justifyContent="end">
      <label>
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={async ({ target }) => {
             upload(type, target)
            }}
        />
        <a
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "#001B87",
            cursor: "pointer",
          }}
        >
          {text}
          <KeyboardArrowRightIcon sx={{ mb: -0.5 }} fontSize="small" />
        </a>
      </label>
    </Grid>
  );
};

export default AddDocumentMedicProfile;
