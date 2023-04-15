import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import AccordionUi from "../utils/AccordionUi";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { MedicContext } from "../../../context/medic";
import { ClinicContext } from "../../../context/clinic";
import { Clinic } from "../../../interfaces";

interface Props {
  children?: ReactNode;
}

export const ManageClinics: FC<Props> = ({}) => {
  const { medic } = useContext(MedicContext);
  const { clinics, getClinicsByMedicId, createClinic, updateClinic } =
    useContext(ClinicContext);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    getClinicsByMedicId(medic?._id);
  }, [medic, getClinicsByMedicId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateClinic(clinics[index]._id || "", {
      ...inputs,
    } as Clinic).then(() => {
      setInputs("");
      setValue("");
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Manage clinics">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            <Select
              fullWidth
              size="small"
              sx={{
                minWidth: 65,
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CFCFCF !important",
                },
                backgroundColor: "white",
              }}
              value={value}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleChange}
            >
              <MenuItem value={""}>Clinics</MenuItem>
              {clinics.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name || ""}
                  onClick={() => setIndex(index)}
                >
                  <span style={{ fontWeight: "500" }}>{item.name}</span>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="finantial"
              label="Finantial situation"
              variant="outlined"
              fullWidth
              autoComplete="off"
              defaultValue={clinics[index]?.finantial || "sdsd"}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="instagram"
              label="Instagram link"
              variant="outlined"
              fullWidth
              autoComplete="off"
              defaultValue={clinics[index]?.instagram || ""}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              color="primary"
              sx={{
                width: "90%",
                color: "black",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageClinics;
