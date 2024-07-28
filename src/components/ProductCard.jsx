import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ dt }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFunc = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    navigate(`/?update=${dt?.id}`);
  };

  return (
    <div className="w-[400px] h-[400px] relative m-2 rounded-md border border-indigo-600">
      <img src={dt?.url} className="w-full h-full rounded-md" alt="" />
      <div className="absolute left-0 bottom-0 bg-indigo-600 text-white w-full px-2">
        <div className="text-lg text-center font-semibold">{dt?.name}</div>
        <div className="text-center">{dt?.price} ₺</div>
      </div>
      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <BsThreeDots
          color="indigo"
          size={28}
          className="transition hover:scale-125 cursor-pointer"
        />
      </div>
      {openEdit && (
        <div className="bg-indigo-600 border border-white text-white absolute top-5 right-2 p-2 text-sm">
          <div
            onClick={() => dispatch(deleteDataFunc(dt?.id))}
            className="cursor-pointer ml-5"
          >
            Sil
          </div>
          <div>
            {" "}
            <hr />{" "}
          </div>
          <div onClick={updateFunc} className="cursor-pointer">
            Güncelle
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
