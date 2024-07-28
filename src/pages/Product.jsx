import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { modalFunc } from "../redux/modalSlice";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toUpperCase(),
      }));
    }
  };

  let loc = location?.search.split("=")[1];
  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc, data]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
    setProductInfo({
      name: "",
      price: "",
      url: "",
    });
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
    setProductInfo({
      name: "",
      price: "",
      url: "",
    });
  };

  const openModalFunc = () => {
    dispatch(modalFunc());
    setProductInfo({
      name: "",
      price: "",
      url: "",
    });
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type="text"
        placeholder={"Ürün Ekle"}
        id={"name"}
        name={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo.price}
        type="text"
        placeholder={"Fiyat Ekle"}
        id={"price"}
        name={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type="file"
        placeholder={"Resim Seç"}
        id={"url"}
        name={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "ürün güncelle" : "ürün oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );
  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        />
      )}
    </div>
  );
};

export default Product;
