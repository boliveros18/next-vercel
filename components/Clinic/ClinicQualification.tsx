import { FC, ReactNode, useState, useEffect, useContext } from "react";
import { ClinicContext } from "../../context/clinic/ClinicContext";
import { AuthContext } from "../../context/auth";
import { Clinic } from "../../interfaces";
import { QualificationUi } from "../ui";

interface Props {
  children?: ReactNode;
  id: number;
}

export const ClinicQualification: FC<Props> = ({ id }) => {
  const { clinics, updateClinic } = useContext(ClinicContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);
  const [currentValue, setCurrentValue] = useState(0);

  const countStars =
    clinics[id].qualification
      .map((item) => item.stars)
      .reduce((previous, current) => previous + current) /
    clinics[id].qualification.length;

  const index = clinics[id]?.qualification.findIndex(
    (i) => i.user_id === user?._id
  );

  useEffect(() => {
    setCurrentValue(Math.round(countStars));
    setInputs(clinics[id]);
  }, [countStars, clinics, id]);

  const generateInput = (inputs: IClinic) => {
    const average =
      inputs.qualification
        .map((item) => item.stars)
        .reduce((previous, current) => previous + current) /
      clinics[id].qualification.length;
    inputs.qualification.map((i) => `${(i.average = average)}`);
    setInputs({ ...inputs });
    updateClinic(clinics[id]._id, inputs);
  };

  const handleClick = (value: number) => {
    if (isLoggedIn) {
      if (
        clinics[id].qualification.filter((i) => i.user_id === user?._id)
          .length === 1
      ) {
        inputs.qualification[index].stars = value;
        generateInput(inputs);
      } else {
        inputs.qualification.push({
          user_id: user?._id || "",
          user_name: user?.name || "",
          approved: false,
          stars: value,
          average: 0,
        });
        generateInput(inputs);
      }
    }
  };

  return (
    <QualificationUi
      average={clinics[id]?.qualification[0]?.average}
      length={clinics[id]?.qualification?.length}
      handleClick={handleClick}
      currentValue={currentValue}
    />
  );
};
