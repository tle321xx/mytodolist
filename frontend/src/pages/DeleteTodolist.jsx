import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'

const DeleteLists = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteList = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/lists/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Booked Deleted', { variant: 'success'})
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error'})
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Todolists</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[500px]">
        <h3 className="text-2x1">Are you sure to delete this Todolists?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteList}
        >
          Yes Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteLists;
