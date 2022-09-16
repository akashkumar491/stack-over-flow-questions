import React, { useEffect, useState } from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, Modal, Typography } from "@mui/material";

type appProps = {
  api: string;
};

const DataTable = (props: appProps) => {
  const rows: {}[] = [];

  const [quesList, setQuesList] = useState(rows);
  const [modalInfo, setModalInfo] = useState({
    link: "",
    title: "",
    display_name: "",
    profile_image: "",
    id: "",
  });

  const [open, setOpen] = useState(false);

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "Question ID",
      width: 150,
      headerAlign: "center",
      headerClassName: "style--header",
    },
    {
      field: "display_name",
      headerName: "Display Name",
      width: 150,
      headerAlign: "center",
      headerClassName: "style--header",
    },
    {
      field: "title",
      headerName: "Question Title",
      width: 700,
      headerAlign: "center",
      headerClassName: "style--header",
    },
  ];

  const getTableData = async (apiLink: string) => {
    try {
      const res = await fetch(apiLink);
      const tableData = await res.json();

      let tempQuesArr = tableData.items.map((item: any, index: number) => ({
        id: item.question_id,
        display_name: item.owner.display_name,
        title: item.title,
        profile_image: item.owner.profile_image,
        link: item.owner.link,
      }));

      setQuesList(tempQuesArr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = (e: any) => {
    setModalInfo(e.row);
    setOpen(true);
  };

  useEffect(() => {
    getTableData(props.api);
  }, [props.api]);

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {quesList.length > 0 ? (
        <div style={{ height: 530, width: "100%" }}>
          <DataGrid
            sx={{
              boxShadow: 2,
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              backgroundColor: "orange",
              height: "100%",
              width: "80%",
              margin: "auto",
              borderTop: "4px solid black",
              "& .style--header": {
                color: "black",
                fontFamily: "sans-serif",
                fontSize: 20,
              },
            }}
            rows={quesList}
            columns={columns}
            onRowClick={handleRowClick}
          />
        </div>
      ) : (
        <div>...Loading</div>
      )}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <p>{modalInfo.display_name}</p>
              <img src={modalInfo.profile_image} alt="alternate_text"></img>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <a href={modalInfo.link}>Question Link</a>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DataTable;
