import React, { useState, useEffect } from "react";
import { ClaimsData } from "../../../utils/Data";
import Table from "../../../components/molecules/dashboard/Table";
import { transformData } from "../../../utils/DataTransformer";
import ActionButton from "../../../components/molecules/dashboard/ActionButton";
import Searchbar from "../../../components/molecules/dashboard/Searchbar";
import FormOverlay from "../../../components/molecules/dashboard/FormOverlay";


const AgentRecord = () => {
  const [formData, setFormData] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

    const handleButtonClick = () => {
      setOverlayVisible(true);
    };
  
    const handleOverlayClose = () => {
      setOverlayVisible(false);

      const storedData = JSON.parse(localStorage.getItem("formData")) || [];
      setFormData(storedData)
      setFilteredData(transformData(storedData));
    };

  useEffect(() => { 
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(storedData)
    setFilteredData(transformData(storedData));
  }, []);



  const updateFilteredData = (newData) => {
    setFilteredData(transformData(newData));
  };

  console.log(formData, "formData")
  console.log(ClaimsData, "ClaimsData")
  console.log(filteredData, "filteredData")

  let tableHead = {
    head1: "S/N",
    head2: "Policy No.",
    head3: "Duration",
    head4: "Premium Amt",
    head5: "Date",
    head6: "Product",
    head7: "Status",
  };

  return (
    <>
      <Searchbar data={formData} keyword="PolicyNo" onUpdateData={updateFilteredData}/>
      <div className="flex justify-between mb-4">
        {/* <div className='flex'>
          <ActionButton title='PDF'/>
          <ActionButton title='EXCEL'/>
          <ActionButton title='PRINT'/>
        </div> */}

        <ActionButton title="Add New" onClick={handleButtonClick} />
        {isOverlayVisible && <FormOverlay onClose={handleOverlayClose} />}
      </div>

      <Table data={{ tableHead, tabledata: filteredData }} />
    </>
  );
};

export default AgentRecord;
