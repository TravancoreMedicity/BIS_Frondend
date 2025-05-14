import { format } from "date-fns";
import axiosApi from "../Axios/Axios";

export const getDocTypeMasterList = async () => {
  return await axiosApi
    .get("/documentTypeMaster/getDocTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSubTypeMasterList = async () => {
  return await axiosApi
    .get("/subTypeMaster/getAllSubTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getCategoryMasterList = async () => {
  return await axiosApi
    .get("/documentCategory/getAllDocCategory")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSelectCategoryNameList = async () => {
  return await axiosApi
    .get("/documentCategory/selectCategoryMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.cat_slno,
            label: item.category_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSubCategoryList = async () => {
  return await axiosApi
    .get("/docSubCategoryName/getAllDocSubCategory")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getGroupList = async () => {
  return await axiosApi.get("/docGroupMaster/getAllDocGroup").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getIntitutionTypeList = async () => {
  return await axiosApi
    .get("/instituteType/getAllInstituteType")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getSelectInstitutionTypeList = async () => {
  return await axiosApi
    .get("/instituteType/getInstitutionTypeSelect")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.institute_type_slno,
            label: item.institute_type_name.toUpperCase(),
          };
        });
      }
    });
};

export const getInstitutionList = async () => {
  return await axiosApi
    .get("/institutionMaster/getAllInstitutionMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data;
      }
    });
};

export const getCourseTypeList = async () => {
  return await axiosApi.get("/courseType/getAllCourseType").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCourseTypeList = async () => {
  return await axiosApi.get("/courseType/getCourseTypeSelect").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          value: item.course_type_slno,
          label: item.course_type_name.toUpperCase(),
        };
      });
    }
  });
};

export const getCourseList = async () => {
  return await axiosApi.get("/courseMaster/getAllCourseMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocNumber = async () => {
  return await axiosApi.get("/selectComponets/getDocNumber").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data[0]?.number;
    }
  });
};

export const getSelectDocTypeMasterList = async () => {
  return await axiosApi
    .get("/documentTypeMaster/selectDocTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.doc_type_slno,
            label: item.doc_type_master_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSelectSubTypeMasterList = async () => {
  return await axiosApi
    .get("/subTypeMaster/selectSubTypeMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.sub_type_slno,
            label: item.doc_sub_type_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSelectInstitutionMasterList = async () => {
  return await axiosApi
    .get("/institutionMaster/selectInstituteMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.institution_slno,
            label: item.institution_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSelectCourseMasterList = async () => {
  return await axiosApi
    .get("/courseMaster/getSelectCourseMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.course_slno,
            label: item.course_name.toUpperCase(),
          };
        });
      }
    });
};

export const getSeelctSubCategoryList = async () => {
  return await axiosApi
    .get("/docSubCategoryName/getSubCategoryList")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.subcat_slno,
            label: item.subcat_name.toUpperCase(),
            catSlno: item.cat_slno,
          };
        });
      }
    });
};

export const getSelectGroupList = async () => {
  return await axiosApi
    .get("/docGroupMaster/getSelectGroupList")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.group_slno,
            label: item.group_name.toUpperCase(),
          };
        });
      }
    });
};

export const getDocumentList = async () => {
  return await axiosApi.get("/docMaster/getDocMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data?.map((item) => {
        return {
          id: item.doc_slno,
          docDate: format(new Date(item.doc_date), "dd-MM-yyyy HH:mm:ss"),
          docVersion: format(
            new Date(item.doc_ver_date),
            "dd-MM-yyyy HH:mm:ss"
          ),
          ...item,
        };
      });
    }
  });
};

export const getDocInforByID = async (id) => {
  return await axiosApi.get(`/docMaster/getDocMasterById/${id}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data[0];
    }
  });
};

export const getDocumentDetl = async (id) => {
  return await axiosApi.get(`/docMaster/getDocDetl/${id}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocTypeCount = async () => {
  return await axiosApi.get(`/docMaster/getDocTypeCount`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocAll = async () => {
  return await axiosApi.get(`/docMaster/getDocSecureOnly`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};


export const getnonSecureDoconly = async () => {
  return await axiosApi.get(`/docMaster/getDocNonSecure`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getDocMasterLikeName = async (name) => {
  if (name !== '' || name !== undefined || name !== null) {
    return await axiosApi.get(`/docMaster/getDocMasterLikeName/${name}`).then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data
      } else {
        return []
      }
    });
  } else {
    return []
  }

};


export const getDocMasterLikeNameNonSecureOnly = async (name) => {
  if (name !== '' || name !== undefined || name !== null) {
    return await axiosApi.get(`/docMaster/getDocMasterLikeNameNonSecureOnly/${name}`).then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data
      } else {
        return []
      }
    })
  } else {
    return []
  }
};


export const getLocationMaster = async () => {
  return await axiosApi.get("/locationMaster/selectLocationMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getLocationMasterList = async () => {
  return await axiosApi.get("/locationMaster/getSelectLocationMasterList")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.loc_slno,
            label: item.loc_name.toUpperCase()
          };
        });
      }
    });
};

export const getRackMasterList = async () => {
  return await axiosApi.get("/rackMaster/selectRackMaster").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getCustodianDepartmentMaster = async () => {
  return await axiosApi.get("/custodianDepartment/selectCusDepartmentList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getSelectCustodianDepartmentList = async () => {
  return await axiosApi.get("/custodianDepartment/selectCusDepartment")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.cust_dept_slno,
            label: item.cust_dept_name.toUpperCase()
          };
        });
      }
    });
};

export const getCustodianMasterList = async () => {
  return await axiosApi.get("/custodianMaster/selectCustodianMasterList").then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getRackMasterData = async () => {
  return await axiosApi.get("/rackMaster/selectCmpRackMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.rac_slno,
            label: item.rack.toUpperCase()
          };
        });
      }
    });
};

export const getSelectCustodianDepartmentData = async () => {
  return await axiosApi.get("/custodianMaster/selectCustodianMaster")
    .then((res) => {
      const { success, data } = res.data;
      if (success === 1) {
        return data?.map((item) => {
          return {
            value: item.cust_slno,
            label: item.cust_name.toUpperCase()
          };
        });
      }
    });
};

// Jomol George 17/3/2025 02:52 pm
export const getAllSuperUsers = async () => {
  return await axiosApi.get(`/user/getSuperUsers`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getAllUsers = async () => {
  return await axiosApi.get(`/user/getAllUser`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const userTypes = async () => {
  return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
    const { success, data } = res.data;

    if (success === 1 && Array.isArray(data)) {
      return data.map(item => ({
        value: item.user_type_slno,
        label: item.user_type
      }));
    }
  });
};

export const getModules = async () => {
  return await axiosApi.get(`/ModuleNameMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1 && Array.isArray(data)) {
      return data.map(item => ({
        value: item.bis_module_slno,
        label: item.bis_module_name
      }));
    }
  });
};

export const getAllModules = async () => {
  return await axiosApi.get(`/ModuleNameMaster/selectAllModules`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data
    }
  });
};
export const getModuleMast = async () => {
  return await axiosApi.get(`/ModuleGroupMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};
export const getuserType = async () => {
  return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};
export const getMenuNames = async () => {
  return await axiosApi.get(`/MenuNameMaster/getdatas`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data;
    }
  });
};

export const getUserModules = async (module_name) => {
  return await axiosApi.get(`/UserGroupRightMaster/ModulewiseMenus/${module_name}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ? data : [];
    }
  });
};
export const userWiseSettingsRights = async (loggedUser) => {
  return await axiosApi.get(`/UserGroupRightMaster/userWiseSettingsRights/${loggedUser}`).then((res) => {
    const { success, data } = res.data;
    if (success === 2) {
      return data ? data : [];
    }
  });
};

export const SubCategoryById = async (catSlno) => {
  return await axiosApi.get(`/docSubCategoryName/getSubCategoryById/${catSlno}`).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data
    }
  });
};

export const getOpPatientDetails = async () => {
  return await axiosApi.get("/bisDataPush/getOpDatas").then((res) => {
    const { success, data } = res.data;
    if (success === 2) {
      return data ? data : [];
    }
  });
};

export const getOpModuleDetails = async () => {
  return await axiosApi.get("/bisDataPush/getOpModuleData").then((res) => {
    const { success, data } = res.data;
    if (success === 2 && Array.isArray(data)) {
      return data?.map((item, index) => ({
        opslno: item?.tmc_op_module_slno ?? index + 1,
        name: item?.tmc_label_name,
        date: item?.tmc_last_update_date,
        status: index === 0 ? 1 : 0,
      }));
    }
    else {
      return [];
    }
  });
};

export const getOpDetails = async (payloadDatas) => {
  return await axiosApi.post("/bisOpModule/opDetails", payloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};
export const getIpDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisIpModule/ipDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getpharmacyDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisPharmacy/pharmacyDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getdischargeDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisDischarge/dischargeDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getlabDetails = async (PayloadDatas) => {
  return await axiosApi.post("/labDetails/getlabDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getradiologyDetails = async (PayloadDatas) => {
  const res = await axiosApi.post("/radiologyDetails/getDetails", PayloadDatas);
  const { success, data } = res.data;
  if (success === 1) {
    return data ?? [];
  } else {
    return [];
  }
};


//for get kmc datas

export const getkmcOpPatientDetails = async () => {
  return await axiosApi.get("/bisKmcDataPush/getOpDatas").then((res) => {
    const { success, data } = res.data;
    if (success === 2) {
      return data ? data : [];
    }
  });
};

export const getkmcOpModuleDetails = async () => {
  return await axiosApi.get("/bisKmcDataPush/getOpModuleData").then((res) => {
    const { success, data } = res.data;
    if (success === 2 && Array.isArray(data)) {
      return data?.map((item, index) => ({
        opslno: item?.kmc_op_module_slno ?? index + 1,
        name: item?.kmc_label_name,
        date: item?.kmc_last_update_date,
        status: index === 0 ? 1 : 0,
      }));
    }
    else {
      return [];
    }
  });
};

export const getkmcOpDetails = async (payloadDatas) => {
  return await axiosApi.post("/bisKmcOpModule/opDetails", payloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};
export const getKmcIpDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisKmcIpModule/ipDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getKmcpharmacyDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisKmcPharmacy/pharmacyDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getKmcdischargeDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisKmcDischarge/dischargeDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getKmclabDetails = async (PayloadDatas) => {
  return await axiosApi.post("/bisKmclabDetails/getlabDetails", PayloadDatas).then((res) => {
    const { success, data } = res.data;
    if (success === 1) {
      return data ?? [];
    } else {
      return [];
    }
  });
};

export const getKmcradiologyDetails = async (PayloadDatas) => {
  const res = await axiosApi.post("/bisKmcradiologyDetails/getDetails", PayloadDatas);
  const { success, data } = res.data;
  if (success === 1) {
    return data ?? [];
  } else {
    return [];
  }
};