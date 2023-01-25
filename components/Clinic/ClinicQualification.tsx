import { FC, ReactNode, useState, useEffect, useContext } from "react";
import { QualificationContext } from "../../context/qualification/QualificationContext";
import { AuthContext } from "../../context/auth";
import { Qualification } from "../../interfaces";
import { QualificationUi } from "../ui";

interface Props {
  children?: ReactNode;
  index: number;
  qualifications: Qualification[]
}

export const ClinicQualification: FC<Props> = ({ qualifications, index }) => {
  const { updateQualification } = useContext(QualificationContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [currentValue, setCurrentValue] = useState(0);

  const countStars =
    qualifications
      .map((item) => item.stars)
      .reduce((previous, current) => previous + current) /
      qualifications.length;


  useEffect(() => {
    setCurrentValue(Math.round(countStars));
  }, [countStars]);

  const generateInput = (qualifications: Qualification[]) => {
    const average =
      qualifications
        .map((item) => item.stars)
        .reduce((previous, current) => previous + current) /
        qualifications.length;
    qualifications.map((i) => `${(i.average = average)}`);
    for(let i = 0; i < qualifications.length ; i++){
      updateQualification(qualifications[i]?._id || "", qualifications[i]);
    }
  };

  const handleClick = (value: number) => {
    if (isLoggedIn) {
      if (
        qualifications.filter((i) => i.user_id === user?._id)
          .length === 1
      ) {
        qualifications[qualifications.indexOf((i) => i.user_id === user?._id)].stars = value;
        generateInput(qualifications);
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
      average={qualifications[0]?.average}
      length={qualifications?.length}
      handleClick={handleClick}
      currentValue={currentValue}
    />
  );
};
