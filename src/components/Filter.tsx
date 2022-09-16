import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Filter.css";

type props = {
  getUpdatedUrl: (url: string) => void;
};

const Filter = (props: props) => {
  const [filterForm, setFilterForm] = useState({
    page: "",
    pagesize: "",
    order: "desc",
    sort: "activity",
    tagged: "",
  });

  useEffect(() => {
    setApiLink(
      "/2.3/questions?page=" +
        filterForm.page +
        "&pagesize=" +
        filterForm.pagesize +
        "&order=" +
        filterForm.order +
        "&sort=" +
        filterForm.sort +
        "&tagged=" +
        filterForm.tagged +
        "&site=stackoverflow"
    );
  }, [filterForm]);
  const [apiLink, setApiLink] = useState("/2.3/questions?");

  const handleChange = (event: any) => {
    setFilterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.getUpdatedUrl(apiLink);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container__form">
        <div className="form__input">
          <span>Page </span>
          <input
            type="number"
            value={filterForm.page}
            onChange={handleChange}
            name="page"
          ></input>
        </div>

        <div className="form__input">
          <span>Page Size </span>
          <input
            type="number"
            value={filterForm.pagesize}
            name="pagesize"
            onChange={handleChange}
          ></input>
        </div>

        <div className="form__input">
          <span>Order </span>
          <select value={filterForm.order} onChange={handleChange} name="order">
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </div>

        <div className="form__input">
          <span>Sort </span>
          <select value={filterForm.sort} onChange={handleChange} name="sort">
            <option value="activity">activity</option>
            <option value="votes">votes</option>
            <option value="creation">creation</option>
            <option value="hot">hot</option>
            <option value="week">week</option>
            <option value="month">month</option>
          </select>
        </div>

        <div className="form__input">
          <span>Tagged </span>
          <input
            type="text"
            value={filterForm.tagged}
            name="tagged"
            onChange={handleChange}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            alignContent: "space-around",
          }}
        >
          <input
            type="text"
            value={apiLink}
            style={{ width: 700 }}
            readOnly
          ></input>
          <Button
            style={{
              color: "black",
              backgroundColor: "orange",
              border: "2px solid black",
            }}
            type="submit"
          >
            {" "}
            RUN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
