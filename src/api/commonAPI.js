import { format, isValid } from "date-fns";
import axiosApi, { axiosellider_kmc, axiosellider_tmc } from "../Axios/Axios";

const getActionApiFunc = async (apiStringName) => {
  try {
    const response = await axiosApi.get(apiStringName, {
      timeout: 10000,
    });

    const { success, data } = response.data;

    if (success !== 1) {
      console.error("Error fetching API Data:", response.data);
      return [];
    }

    if (!Array.isArray(data)) {
      console.error("Invalid Data Format || Not an array of data:", response.data);
      return [];
    }

    return data; //  return only inside try if valid
  } catch (error) {
    console.error("Error fetching API Data:", error);
    return [];
  }
};

// Usage
export const getDocTypeMasterList = () => getActionApiFunc("/documentTypeMaster/getDocTypeMaster");
export const getSubTypeMasterList = () => getActionApiFunc("/subTypeMaster/getAllSubTypeMaster");
export const getCategoryMasterList = () => getActionApiFunc("/documentCategory/getAllDocCategory");
export const getSubCategoryList = () => getActionApiFunc("/docSubCategoryName/getAllDocSubCategory");
export const getGroupList = () => getActionApiFunc("/docGroupMaster/getAllDocGroup");
export const getIntitutionTypeList = () => getActionApiFunc("/instituteType/getAllInstituteType");
export const getInstitutionList = () => getActionApiFunc("/institutionMaster/getAllInstitutionMaster");
export const getCourseTypeList = () => getActionApiFunc("/courseType/getAllCourseType");
export const getCourseList = () => getActionApiFunc("/courseMaster/getAllCourseMaster");
export const getDocTypeCount = () => getActionApiFunc(`/docMaster/getDocTypeCount`);
export const getDocAll = () => getActionApiFunc(`/docMaster/getDocSecureOnly`);
export const getnonSecureDoconly = () => getActionApiFunc(`/docMaster/getDocNonSecure`);
export const getLocationMaster = () => getActionApiFunc("/locationMaster/selectLocationMaster");
export const getRackMasterList = () => getActionApiFunc("/rackMaster/selectRackMaster");
export const getCustodianDepartmentMaster = () => getActionApiFunc("/custodianDepartment/selectCusDepartmentList");
export const getCustodianMasterList = () => getActionApiFunc("/custodianMaster/selectCustodianMasterList");
export const getAllSuperUsers = () => getActionApiFunc(`/user/getSuperUsers`);
export const getAllUsers = () => getActionApiFunc(`/user/getAllUser`);
export const getAllModules = () => getActionApiFunc(`/ModuleNameMaster/selectAllModules`);
export const getModuleMast = () => getActionApiFunc(`/ModuleGroupMaster/getdatas`);
export const getuserType = () => getActionApiFunc(`/UserTypeMaster/getdatas`);
export const getMenuNames = () => getActionApiFunc(`/MenuNameMaster/getdatas`);
export const getUsergrpRights = () => getActionApiFunc(`/UserGroupRightMaster/getUsergrpRights`);
export const getSubMenuNames = () => getActionApiFunc(`/bisSubMenuMaster/getdatas`);

// Usage for select category list
export const getSelectCategoryNameList = async () => {
  const data = await getActionApiFunc("/documentCategory/selectCategoryMaster");
  // Map only if valid array
  return data.map((item) => ({
    value: item.cat_slno,
    label: item.category_name?.toUpperCase() ?? "", // safe check
  }));
};


export const getSelectInstitutionTypeList = async () => {
  const data = await getActionApiFunc("/instituteType/getInstitutionTypeSelect");
  return data.map((item) => ({
    value: item.institute_type_slno,
    label: item.institute_type_name?.toUpperCase() ?? "",
  }));
};


export const getSelectCourseTypeList = async () => {
  const data = await getActionApiFunc("/courseType/getCourseTypeSelect");
  return data.map((item) => ({
    value: item.course_type_slno,
    label: item.course_type_name?.toUpperCase() ?? "",
  }));
};



export const getSelectDocTypeMasterList = async () => {
  const data = await getActionApiFunc("/documentTypeMaster/selectDocTypeMaster");
  return data.map((item) => ({
    value: item.doc_type_slno,
    label: item.doc_type_master_name?.toUpperCase() ?? "",
  }));
};

export const getSelectSubTypeMasterList = async () => {
  const data = await getActionApiFunc("/subTypeMaster/selectSubTypeMaster");
  return data.map((item) => ({
    value: item.sub_type_slno,
    label: item.doc_sub_type_name?.toUpperCase() ?? "",
  }));
};


export const getSelectInstitutionMasterList = async () => {
  const data = await getActionApiFunc("/institutionMaster/selectInstituteMaster");
  return data.map((item) => ({
    value: item.institution_slno,
    label: item.institution_name?.toUpperCase() ?? "",
  }));
};


export const getSelectCourseMasterList = async () => {
  const data = await getActionApiFunc("/courseMaster/getSelectCourseMaster");
  return data.map((item) => ({
    value: item.course_slno,
    label: item.course_name?.toUpperCase() ?? "",
  }));
};

export const getSeelctSubCategoryList = async () => {
  const data = await getActionApiFunc("/docSubCategoryName/getSubCategoryList");
  return data.map((item) => ({
    value: item.subcat_slno,
    label: item.subcat_name?.toUpperCase() ?? "",
    catSlno: item.cat_slno,
  }));
};


export const getSelectGroupList = async () => {
  const data = await getActionApiFunc("/docGroupMaster/getSelectGroupList");
  return data.map((item) => ({
    value: item.group_slno,
    label: item.group_name.toUpperCase() ?? "",
  }));
};


export const getDocumentList = async () => {
  const data = await getActionApiFunc("/docMaster/getDocMaster");

  return data?.map((item) => {
    const docDateObj = new Date(item.doc_date);
    const docVerDateObj = new Date(item.doc_ver_date);

    return {
      id: item.doc_slno,
      docDate: isValid(docDateObj)
        ? format(docDateObj, "dd-MM-yyyy HH:mm:ss")
        : null,
      docVersion: isValid(docVerDateObj)
        ? format(docVerDateObj, "dd-MM-yyyy HH:mm:ss")
        : null,
      ...item,
    };
  });
};


export const getLocationMasterList = async () => {
  const data = await getActionApiFunc("/locationMaster/getSelectLocationMasterList");
  return data.map((item) => ({
    value: item.loc_slno,
    label: item.loc_name.toUpperCase() ?? "",
  }));
};

export const getSelectCustodianDepartmentList = async () => {
  const data = await getActionApiFunc("/custodianDepartment/selectCusDepartment");
  return data.map((item) => ({
    value: item.cust_dept_slno,
    label: item.cust_dept_name.toUpperCase() ?? "",
  }));
};

export const getRackMasterData = async () => {
  const data = await getActionApiFunc("/rackMaster/selectCmpRackMaster");
  return data.map((item) => ({
    value: item.rac_slno,
    label: item.rack.toUpperCase() ?? "",
  }));
};


export const getSelectCustodianDepartmentData = async () => {
  const data = await getActionApiFunc("/custodianMaster/selectCustodianMaster");
  return data.map((item) => ({
    value: item.cust_slno,
    label: item.cust_name.toUpperCase() ?? "",
  }));
};


export const userTypes = async () => {
  const data = await getActionApiFunc(`/UserTypeMaster/getdatas`);
  return data.map((item) => ({
    value: item.user_type_slno,
    label: item.user_type,
  }));
};

export const getModules = async () => {
  const data = await getActionApiFunc(`/ModuleNameMaster/getdatas`);
  return data.map((item) => ({
    value: item.bis_module_slno,
    label: item.bis_module_name.toUpperCase() ?? ""
  }));
};


export const getDocNumber = async () => {
  try {
    const res = await axiosApi.get("/selectComponets/getDocNumber");
    const { success, data } = res.data;

    if (success === 1) {
      return data[0]?.number ?? null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Doc Number:", error);
    return null;
  }
};

export const getDocInforByID = async (id) => {
  try {
    const res = await axiosApi.get(`/docMaster/getDocMasterById/${id}`);
    const { success, data } = res.data;

    if (success === 1) {
      return data[0] ?? null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching Doc Info for ID ${id}:`, error);
    return null;
  }
};

export const getDocumentDetl = async (id) => {
  try {
    const response = await axiosApi.get(`/docMaster/getDocDetl/${id}`, {
      timeout: 10000,
    });

    const { success, data } = response.data;

    if (success !== 1) {
      console.error("Error fetching Document Details:", response.data);
      return [];
    }

    if (!Array.isArray(data)) {
      console.error("Invalid Data Format || Not an array:", response.data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Exception while fetching Document Details:", error.message || error);
    return [];
  }
};



const fetchApiData = async (url, validateArray = false) => {
  try {
    const response = await axiosApi.get(url, { timeout: 10000 });
    const { success, data } = response.data;

    if (success !== 1) {
      console.error("API Error:", response.data);
      return [];
    }

    if (validateArray && !Array.isArray(data)) {
      console.error("Invalid Data Format (expected array):", response.data);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("API Exception:", error.message || error);
    return [];
  }
};


export const getDocMasterLikeName = (name) =>
  name ? fetchApiData(`/docMaster/getDocMasterLikeName/${name}`, true) : [];

export const getDocMasterLikeNameNonSecureOnly = (name) =>
  name ? fetchApiData(`/docMaster/getDocMasterLikeNameNonSecureOnly/${name}`, true) : [];

export const getUserModules = (module_name) =>
  fetchApiData(`/UserGroupRightMaster/ModulewiseMenus/${module_name}`);

export const SubCategoryById = (catSlno) =>
  fetchApiData(`/docSubCategoryName/getSubCategoryById/${catSlno}`);

export const getUserDrawerfun = (loggedUser) =>
  fetchApiData(`/tmReport/getUserDrawer/${loggedUser}`);



//API Calls method- POST
const postApiData = async (url, payload, validateArray = false) => {
  try {
    const response = await axiosApi.post(url, payload, { timeout: 10000 });
    const { success, data } = response.data;

    if (success !== 1) {
      console.error("API Error:", response.data);
      return [];
    }

    if (validateArray && !Array.isArray(data)) {
      console.error("Invalid Data Format (expected array):", response.data);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("API Exception:", error.message || error);
    return [];
  }
};

//tmc
export const getOpDetails = (payloadDatas) =>
  postApiData("/bisOpModule/opDetails", payloadDatas);

export const getIpDetails = (payloadDatas) =>
  postApiData("/bisIpModule/ipDetails", payloadDatas);

export const getpharmacyDetails = (payloadDatas) =>
  postApiData("/bisPharmacy/pharmacyDetails", payloadDatas);

export const getdischargeDetails = (payloadDatas) =>
  postApiData("/bisDischarge/dischargeDetails", payloadDatas);

export const getlabDetails = (payloadDatas) =>
  postApiData("/labDetails/getlabDetails", payloadDatas);

export const getradiologyDetails = (payloadDatas) =>
  postApiData("/radiologyDetails/getDetails", payloadDatas);


//kmc
export const getkmcOpDetails = (payloadDatas) =>
  postApiData("/bisKmcOpModule/opDetails", payloadDatas);

export const getKmcIpDetails = (payloadDatas) =>
  postApiData("/bisKmcIpModule/ipDetails", payloadDatas);

export const getKmcpharmacyDetails = (payloadDatas) =>
  postApiData("/bisKmcPharmacy/pharmacyDetails", payloadDatas);

export const getKmcdischargeDetails = (payloadDatas) =>
  postApiData("/bisKmcDischarge/dischargeDetails", payloadDatas);

export const getKmclabDetails = (payloadDatas) =>
  postApiData("/bisKmclabDetails/getlabDetails", payloadDatas);

export const getKmcradiologyDetails = (payloadDatas) =>
  postApiData("/bisKmcradiologyDetails/getDetails", payloadDatas);




// dfjhkldjhkdjjklfgjhkdlghklllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll



















// ********************************************************************************************





const fetchModuleData = async (url, mapperFn) => {
  try {
    const res = await axiosApi.get(url, { timeout: 10000 });
    const { success, data } = res.data;

    if (success === 2 && Array.isArray(data)) {
      return data.map((item, index) => mapperFn(item, index));
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message || error);
    return [];
  }
};

// OP - TMC
export const getOpModuleDetails = () =>
  fetchModuleData("/bisDataPush/getOpModuleData", (item, index) => ({
    opslno: item?.tmc_op_module_slno ?? index + 1,
    name: item?.tmc_label_name,
    date: item?.tmc_last_update_date,
    status: index === 0 ? 1 : 0,
  }));

// OP - KMC
export const getkmcOpModuleDetails = () =>
  fetchModuleData("/bisKmcDataPush/getOpModuleData", (item, index) => ({
    opslno: item?.kmc_op_module_slno ?? index + 1,
    name: item?.kmc_label_name,
    date: item?.kmc_last_update_date,
    status: index === 0 ? 1 : 0,
  }));

// IP - TMC
export const getIpModuleDetails = () =>
  fetchModuleData("/bisDataPush/getIpModuleData", (item, index) => ({
    opslno: item?.tmc_ip_module_slno ?? index + 1,
    name: item?.tmc_ip_label_name,
    date: item?.tmc_ip_last_update_date,
    status: index === 0 ? 1 : 0,
  }));

// IP - KMC
export const getKmcIpModuleDetails = () =>
  fetchModuleData("/bisKmcDataPush/getKmcIpModuleData", (item, index) => ({
    opslno: item?.kmc_ip_module_slno ?? index + 1,
    name: item?.kmc_ip_label_name,
    date: item?.kmc_ip_last_update_date,
    status: index === 0 ? 1 : 0,
  }));


const fetchGetApi = async (axiosInstance, url) => {
  try {
    const res = await axiosInstance.get(url, { timeout: 10000 }); //  10 sec
    const { success, data } = res.data;

    if (success === 2) {
      return data ?? [];
    } else {
      console.error(`API Error [${url}]:`, res.data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching API [${url}]:`, error);
    return [];
  }
};


// 🔹 Using the common function
export const getActiveItems = async () => { return await fetchGetApi(axiosellider_kmc, "/bisQuotationData/getActiveItems"); };
export const getTmcActiveItems = async () => { return await fetchGetApi(axiosellider_tmc, "/bisQuotationData/getActiveItems"); };
export const getKMCTotalQtn = async () => { return await fetchGetApi(axiosellider_kmc, "/bisQuotationData/getTotalQtn"); };
export const getTmcCTotalQtn = async () => { return await fetchGetApi(axiosellider_tmc, "/bisQuotationData/getTotalQtn"); };
export const getOpPatientDetails = async () => { return await fetchGetApi(axiosApi, "/bisDataPush/getOpDatas"); };
export const getkmcOpPatientDetails = async () => { return await fetchGetApi(axiosApi, "/bisKmcDataPush/getOpDatas"); };
export const getKMCLinkedItems = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/getKMCLinkedItems"); };
export const getTmcLinkedItems = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/getTMCLinkedItems"); };
export const getKMCFinalizedQtn = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/KMCFinalizedQtn"); };
export const getTmcFinalizedQtn = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/TMCFinalizedQtn"); };
export const GetstoreMaster = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/TMCFinalizedQtn"); };
export const GetTmcStoreMaster = async () => { return await fetchGetApi(axiosApi, "/bisQuotation/getTmcStoreData"); };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// *************************************************************************************************************************************









// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

















export const userWiseSettingsRights = async (loggedUser) => {
  return await axiosApi.get(`/UserGroupRightMaster/userWiseSettingsRights/${loggedUser}`).then((res) => {
    const { success, data } = res.data;
    if (success === 2) {
      return data ? data : [];
    }
  });
};







export const getgraphicalViewRights = async authNo => {
  return axiosApi.get(`/bisGraphicalViewMast/fetchGraphicalviewRights/${authNo}`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}