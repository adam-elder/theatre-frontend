import CastsTable from "../components/CastsTable";
import CharacterTable from "../components/CharacterTable";
import { useGetAllCharactersQuery } from "../redux/features/characters/charactersApi";
import { useGetAllCastQuery } from "../redux/features/cast/castApi";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";
const HomePage = () => {

  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useGetAllCharactersQuery();
  const {
    data: castsData,
    isLoading: isCastLoading,
    isError: isCastError,
    isSuccess: isCastSuccess,
  } = useGetAllCastQuery();

  const signOut = () => {
    dispatch(logoutUser());
  }
  let content;
  if (isLoading || isCastLoading) {
    content = <Loader />;
  } else if ((!isLoading || !isCastLoading) && (isError || isCastError)) {
    content = <div>something is wrong</div>;
  } else if (
    (!isLoading && !isCastLoading && !isError && !isCastError && isSuccess) ||
    isCastSuccess
  ) {
    content = (
      <>
        <div className="flex justify-end mb-5">
          <button onClick={signOut} className="btn btn-primary">Logout</button>
        </div>
        <CharacterTable
          title="Characters"
          data={data.data}
          link="/add-character"
        />
        <CastsTable
          classes={"mt-24"}
          title="Casts"
          data={castsData.data}
          link="/add-cast"
        />
      </>
    );
  }
  return content;
};

export default HomePage;
