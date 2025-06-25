import React from 'react'

export const Sample = () => {
    return (
        <div>Sample</div>



        //BIS STORE MODULE
        // const InsertMedDesc = async (callBack) => {
        //   let pool_ora, conn_ora;

        //   try {
        //     pool_ora = await oraConnection();
        //     conn_ora = await pool_ora.getConnection();

        //     const oracleSql = `
        //       SELECT meddesc.it_code,
        //              meddesc.itc_desc,
        //              meddesc.itc_alias,
        //              meddesc.itn_strip,
        //              medcategory.mc_code,
        //              medcategory.mcc_desc,
        //              medgroup.mg_code,
        //              medgroup.mgc_desc,
        //              medgencomb.cmc_desc,
        //              medtype.mtc_desc,
        //              DECODE(meddesc.itc_medicine,'N','No','Y','MEDICINE') AS MEDICINE,
        //              DECODE(meddesc.itc_consumable,'N','No','Y','CONSUM') AS CONSUMABLE,
        //              DECODE(meddesc.itc_highvalue,'N',' ','Y','VALUE') AS HIGH_VALUE,
        //              DECODE(meddesc.itc_highrisk,'N',' ','Y','HIGH_RISK') AS HIGH_RISK,
        //              DECODE(meddesc.itc_hazardous,'N',' ','Y','HAZARDOUS') AS HAZARDOUS,
        //              DECODE(meddesc.itc_ved,'N','None','V','Vital','E','Essential','D','Desirable') AS VED,
        //              DECODE(meddesc.itc_breakable,'N','No','Y','Yes') AS BREAKABLE,
        //              meddesc.itn_breakqty,
        //              meddesc.itn_lprate,
        //              meddesc.itn_mrp,
        //              meddesc.itn_originalmrp,
        //              meddesc.itn_gendisper,
        //              meddesc.itn_genipdisper,
        //              meddesc.itd_date,
        //              meddesc.itd_eddate
        //       FROM MEDDESC
        //       RIGHT JOIN (SELECT DISTINCT(IT_CODE) FROM MEDSTORE) B ON MEDDESC.IT_CODE = B.IT_CODE
        //       LEFT JOIN medcategory ON meddesc.mc_code = medcategory.mc_code
        //       LEFT JOIN medgroup ON meddesc.mg_code = medgroup.mg_code
        //       LEFT JOIN medtype ON meddesc.mt_code = medtype.mt_code
        //       LEFT JOIN medstore ON meddesc.it_code = medstore.it_code
        //       LEFT JOIN pstparam ON medstore.st_code = pstparam.st_code
        //       LEFT JOIN medgencomb ON meddesc.cm_code = medgencomb.cm_code
        //       WHERE MEDDESC.ITC_STATUS = 'Y'
        //       GROUP BY meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, medcategory.mc_code, medcategory.mcc_desc,
        //                medgroup.mg_code, medgroup.mgc_desc, medtype.mt_code, medtype.mtc_desc, meddesc.itc_assestitem,
        //                meddesc.itc_medicine, meddesc.itc_consumable, meddesc.itc_highvalue, meddesc.itc_highrisk,
        //                meddesc.itc_hazardous, medgencomb.cmc_desc, meddesc.itc_ved, meddesc.itn_strip,
        //                meddesc.itc_breakable, meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
        //                meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper, meddesc.itd_date,
        //                meddesc.itd_eddate`;

        //     const result = await conn_ora.execute(oracleSql, [], {
        //       resultSet: true,
        //       outFormat: oracledb.OUT_FORMAT_OBJECT,
        //     });

        //     const rows = await result.resultSet.getRows();
        //     if (!rows || rows.length === 0) return;

        //     const Values = rows.map(store => [
        //       store.IT_CODE,
        //       store.ITC_DESC,
        //       store.ITC_ALIAS,
        //       store.ITN_STRIP,
        //       store.MC_CODE,
        //       store.MCC_DESC,
        //       store.MG_CODE,
        //       store.MGC_DESC,
        //       store.CMC_DESC,
        //       store.MTC_DESC,
        //       store.MEDICINE,
        //       store.CONSUMABLE,
        //       store.HIGH_VALUE,
        //       store.HIGH_RISK,
        //       store.HAZARDOUS,
        //       store.VED,
        //       store.BREAKABLE,
        //       store.ITN_BREAKQTY,
        //       store.ITN_LPRATE,
        //       store.ITN_MRP,
        //       store.ITN_ORIGINALMRP,
        //       store.ITN_GENDISPER,
        //       store.ITN_GENIPDISPER,
        //       store.ITD_DATE,
        //       store.ITD_EDDATE
        //     ]);

        //     bispool.getConnection((err, connection) => {
        //       if (err) return console.log("MySQL connection error", err);

        //       connection.beginTransaction(err => {
        //         if (err) {
        //           connection.release();
        //           return console.log("Begin transaction error", err);
        //         }
        //         connection.query(
        //           `INSERT INTO bis_med_desc_mast(
        //               it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc,
        //               mg_code, mgc_desc, cmc_desc, mtc_desc, itc_medicine, itc_consumable,
        //               itc_highvalue, itc_highrisk, itc_hazardous, itc_ved, itc_breakable,
        //               itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp, itn_gendisper,
        //               itn_genipdisper, create_date, edit_date
        //           ) VALUES ?`,
        //           [Values],
        //           (err, result) => {
        //             if (err) {
        //               connection.rollback(() => connection.release());
        //               return console.log("Insert error", err);
        //             }

        //             connection.commit(err => {
        //               if (err) {
        //                 connection.rollback(() => connection.release());
        //                 return console.log("Commit error", err);
        //               }
        //               else {
        //                 connection.query(
        //                   `SELECT med_slno, it_code, st_code FROM bis_med_store`,
        //                   [],
        //                   (err, result) => {
        //                     if (err) {
        //                       connection.rollback(() => connection.release());
        //                       return console.log("Insert error", err);
        //                     }
        //                     console.log("result", result);
        //                     const updateDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        //                   }

        //                 )


        //                 //code started
        //                 //   connection.commit(async (err) => {
        //                 //     pool_ora = await oraConnection();
        //                 //     conn_ora = await pool_ora.getConnection();
        //                 //     if (err) {
        //                 //       connection.rollback(() => connection.release());
        //                 //       return console.log("Commit error", err);
        //                 //     }

        //                 //     try {
        //                 //       // Fetch MEDSTORE data from Oracle
        //                 //       const medstoreqry = `
        //                 //       SELECT MEDSTORE.IT_CODE, MEDSTORE.ST_CODE
        //                 //       FROM MEDDESC
        //                 //       LEFT JOIN MEDSTORE ON MEDDESC.IT_CODE = MEDSTORE.IT_CODE
        //                 //       WHERE MEDDESC.ITC_STATUS = 'Y'
        //                 //     `;

        //                 //       const result = await conn_ora.execute(medstoreqry, [], {
        //                 //         resultSet: true,
        //                 //         outFormat: oracledb.OUT_FORMAT_OBJECT,
        //                 //       });

        //                 //       const rows = await result.resultSet.getRows();
        //                 //       await result.resultSet.close();

        //                 //       if (!rows || rows.length === 0) {
        //                 //         console.log("No MEDSTORE records found");
        //                 //         return;
        //                 //       }
        //                 //       const medstoreValues = rows.map(store => [
        //                 //         store.IT_CODE,
        //                 //         store.ST_CODE,
        //                 //       ]);

        //                 //       // Now insert into MySQL (bispool)
        //                 //       bispool.getConnection((err, bisConnection) => {
        //                 //         if (err) return console.log("MySQL bispool connection error", err);

        //                 //         bisConnection.beginTransaction(err => {
        //                 //           if (err) {
        //                 //             bisConnection.release();
        //                 //             return console.log("Begin transaction error", err);
        //                 //           }

        //                 //           bisConnection.query(
        //                 //             `INSERT INTO bis_medstore_log(it_code, st_code) VALUES ?`,
        //                 //             [medstoreValues],
        //                 //             (err, result) => {
        //                 //               if (err) {
        //                 //                 bisConnection.rollback(() => bisConnection.release());
        //                 //                 return console.log("Insert error", err);
        //                 //               }
        //                 //             }
        //                 //           );
        //                 //         });
        //                 //       });

        //                 //     } catch (error) {
        //                 //       console.log("Oracle MEDSTORE fetch error:", error);
        //                 //     }
        //                 //   });
        //               }


        //               //code ended





        //             });
        //           }
        //         );
        //       });
        //     });

        //   } catch (error) {
        //     console.log("Oracle fetch or process error:", error);
        //     if (callBack) callBack(error);
        //   } finally {
        //     if (conn_ora) await conn_ora.close();
        //     if (pool_ora) await pool_ora.close();
        //   }
        // }


        // ****************GET TRIGER DATE***********************







        // const InsertKmcMedDesc = async (callBack) => {
        //   let pool_ora, conn_ora;

        //   try {
        //     pool_ora = await oraKmcConnection();
        //     conn_ora = await pool_ora.getConnection();

        //     const oracleSql = `
        //       SELECT meddesc.it_code,
        //              meddesc.itc_desc,
        //              meddesc.itc_alias,
        //              meddesc.itn_strip,
        //              medcategory.mc_code,
        //              medcategory.mcc_desc,
        //              medgroup.mg_code,
        //              medgroup.mgc_desc,
        //              medgencomb.cmc_desc,
        //              medtype.mtc_desc,
        //              DECODE(meddesc.itc_medicine,'N','No','Y','MEDICINE') AS MEDICINE,
        //              DECODE(meddesc.itc_consumable,'N','No','Y','CONSUM') AS CONSUMABLE,
        //              DECODE(meddesc.itc_highvalue,'N',' ','Y','VALUE') AS HIGH_VALUE,
        //              DECODE(meddesc.itc_highrisk,'N',' ','Y','HIGH_RISK') AS HIGH_RISK,
        //              DECODE(meddesc.itc_hazardous,'N',' ','Y','HAZARDOUS') AS HAZARDOUS,
        //              DECODE(meddesc.itc_ved,'N','None','V','Vital','E','Essential','D','Desirable') AS VED,
        //              DECODE(meddesc.itc_breakable,'N','No','Y','Yes') AS BREAKABLE,
        //              meddesc.itn_breakqty,
        //              meddesc.itn_lprate,
        //              meddesc.itn_mrp,
        //              meddesc.itn_originalmrp,
        //              meddesc.itn_gendisper,
        //              meddesc.itn_genipdisper,
        //              meddesc.itd_date,
        //              meddesc.itd_eddate
        //       FROM MEDDESC
        //       RIGHT JOIN (SELECT DISTINCT(IT_CODE) FROM MEDSTORE) B ON MEDDESC.IT_CODE = B.IT_CODE
        //       LEFT JOIN medcategory ON meddesc.mc_code = medcategory.mc_code
        //       LEFT JOIN medgroup ON meddesc.mg_code = medgroup.mg_code
        //       LEFT JOIN medtype ON meddesc.mt_code = medtype.mt_code
        //       LEFT JOIN medstore ON meddesc.it_code = medstore.it_code
        //       LEFT JOIN pstparam ON medstore.st_code = pstparam.st_code
        //       LEFT JOIN medgencomb ON meddesc.cm_code = medgencomb.cm_code
        //       WHERE MEDDESC.ITC_STATUS = 'Y' AND (meddesc.itd_date >= TO_DATE(:FROM_DATE, 'dd/MM/yyyy hh24:mi:ss') AND meddesc.itd_date <= TO_DATE(:TO_DATE, 'dd/MM/yyyy hh24:mi:ss'))
        //       GROUP BY meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, medcategory.mc_code, medcategory.mcc_desc,
        //                medgroup.mg_code, medgroup.mgc_desc, medtype.mt_code, medtype.mtc_desc, meddesc.itc_assestitem,
        //                meddesc.itc_medicine, meddesc.itc_consumable, meddesc.itc_highvalue, meddesc.itc_highrisk,
        //                meddesc.itc_hazardous, medgencomb.cmc_desc, meddesc.itc_ved, meddesc.itn_strip,
        //                meddesc.itc_breakable, meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
        //                meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper, meddesc.itd_date,
        //                meddesc.itd_eddate`;

        //     const detail = await getBisKmcLastTriggerDate();

        //     const lastUpdatetDate = detail?.last_trgrt_date
        //       ? new Date(detail?.last_trgrt_date)
        //       : subMonths(new Date(), 1);

        //     // const manualFromDate = new Date(2025, 4, 20, 10, 10, 0); // test date

        //     // date convertion to oracle support
        //     const fromDate = format(new Date(lastUpdatetDate), 'dd/MM/yyyy HH:mm:ss')
        //     const toDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

        //     // mysqlsupport format
        //     const result = await conn_ora.execute(
        //       oracleSql,
        //       {
        //         FROM_DATE: fromDate,
        //         TO_DATE: toDate
        //       },
        //       { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
        //     );

        //     // const result = await conn_ora.execute(oracleSql, [], {
        //     //   resultSet: true,
        //     //   outFormat: oracledb.OUT_FORMAT_OBJECT,
        //     // });

        //     const rows = await result.resultSet.getRows();
        //     await result.resultSet.close();

        //     if (!rows || rows.length === 0) return;

        //     const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        //     const Values = rows.map(store => [
        //       store.IT_CODE,
        //       store.ITC_DESC,
        //       store.ITC_ALIAS,
        //       store.ITN_STRIP,
        //       store.MC_CODE,
        //       store.MCC_DESC,
        //       store.MG_CODE,
        //       store.MGC_DESC,
        //       store.CMC_DESC,
        //       store.MTC_DESC,
        //       store.MEDICINE,
        //       store.CONSUMABLE,
        //       store.HIGH_VALUE,
        //       store.HIGH_RISK,
        //       store.HAZARDOUS,
        //       store.VED,
        //       store.BREAKABLE,
        //       store.ITN_BREAKQTY,
        //       store.ITN_LPRATE,
        //       store.ITN_MRP,
        //       store.ITN_ORIGINALMRP,
        //       store.ITN_GENDISPER,
        //       store.ITN_GENIPDISPER,
        //       store.ITD_DATE,
        //       store.ITD_EDDATE
        //     ]);

        //     bispool.getConnection((err, connection) => {
        //       if (err) return console.log("MySQL connection error", err);

        //       connection.beginTransaction(err => {
        //         if (err) {
        //           connection.release();
        //           return console.log("Begin transaction error", err);
        //         }
        //         connection.query(
        //           `INSERT INTO bis_kmc_med_desc_mast(
        //               it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc,
        //               mg_code, mgc_desc, cmc_desc, mtc_desc, itc_medicine, itc_consumable,
        //               itc_highvalue, itc_highrisk, itc_hazardous, itc_ved, itc_breakable,
        //               itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp, itn_gendisper,
        //               itn_genipdisper, create_date, edit_date
        //           ) VALUES ?`,
        //           [Values],
        //           (err, result) => {
        //             console.log("result", result);
        //             if (err) {
        //               connection.rollback(() => connection.release());
        //               return console.log("Insert error", err);
        //             }

        //             connection.commit(err => {
        //               if (err) {
        //                 connection.rollback(() => connection.release());
        //                 return console.log("Commit error", err);
        //               }

        //               const selectQuery = `SELECT med_slno, it_code, st_code FROM bis_kmc_med_store`;
        //               connection.query(selectQuery, [], (err, results) => {
        //                 if (err) {
        //                   connection.release();
        //                   if (callBack) callBack(err);
        //                 } else {

        //                   // if (callBack) callBack(null, "Success");

        //                   //  ************************* else end******************************



        //                   // const medStoreLogData = results.map(val => [
        //                   //   val.it_code,
        //                   //   val.st_code,
        //                   //   currentDate
        //                   // ]);

        //                   // connection.query(
        //                   //   `INSERT INTO bis_kmc_medstore_log(it_code, st_code, update_date) VALUES ?`,
        //                   //   [medStoreLogData],
        //                   //   (err, result) => {
        //                   //     if (err) {
        //                   //       connection.release();
        //                   //       return console.log("Insert error in bis_medstore_log:", err);
        //                   //     }

        //                   // connection.query(`DELETE FROM bis_kmc_med_store`, [], async (err, results) => {
        //                   // connection.release();
        //                   // if (err) {
        //                   //   if (callBack) callBack(err);
        //                   //   return;
        //                   // }

        //                   try {
        //                     // Fresh Oracle connection for fetching MEDSTORE
        //                     const pool2 = await oraConnection();
        //                     const conn2 = await pool2.getConnection();

        //                     const medstoreqry = `
        //                         SELECT MEDSTORE.IT_CODE, MEDSTORE.ST_CODE
        //                         FROM MEDDESC
        //                         LEFT JOIN MEDSTORE ON MEDDESC.IT_CODE = MEDSTORE.IT_CODE
        //                         WHERE MEDDESC.ITC_STATUS = 'Y'
        //                       `;

        //                     const result2 = await conn2.execute(medstoreqry, [], {
        //                       resultSet: true,
        //                       outFormat: oracledb.OUT_FORMAT_OBJECT,
        //                     });

        //                     const rowss = await result2.resultSet.getRows();
        //                     await result2.resultSet.close();
        //                     await conn2.close();
        //                     await pool2.close();

        //                     if (!rowss || rowss.length === 0) {
        //                       if (callBack) callBack(null, "No MEDSTORE records");
        //                       return;
        //                     }

        //                     const medstoreValues = rowss.map(store => [
        //                       store.IT_CODE,
        //                       store.ST_CODE,
        //                     ]);

        //                     bispool.getConnection((err, bisConnection) => {
        //                       if (err) {
        //                         if (callBack) callBack(err);
        //                         return;
        //                       }

        //                       bisConnection.beginTransaction(err => {
        //                         if (err) {
        //                           bisConnection.release();
        //                           if (callBack) callBack(err);
        //                           return;
        //                         }
        //                         bisConnection.query(
        //                           `INSERT INTO bis_kmc_med_store(it_code, st_code) VALUES ?`,
        //                           [medstoreValues],
        //                           (err, result) => {
        //                             if (err) {
        //                               return bisConnection.rollback(() => {
        //                                 bisConnection.release();
        //                                 if (callBack) callBack(err);
        //                               });
        //                             }

        //                             // Step 2: Update the trigger date
        //                             bisConnection.query(
        //                               `UPDATE bis_kmc_trigger_details SET last_trgrt_date = ? WHERE trgr_slno = 1`,
        //                               [currentDate],
        //                               (err, result) => {
        //                                 if (err) {
        //                                   return bisConnection.rollback(() => {
        //                                     bisConnection.release();
        //                                     if (callBack) callBack(err);
        //                                   });
        //                                 }

        //                                 // Step 3: Commit if all succeeded
        //                                 bisConnection.commit(err => {
        //                                   bisConnection.release();
        //                                   if (err) {
        //                                     if (callBack) callBack(err);
        //                                   } else {
        //                                     if (callBack) callBack(null, "Success");
        //                                   }
        //                                 });
        //                               }
        //                             );
        //                           }
        //                         );
        //                       });
        //                     });

        //                     // } catch (error) {
        //                     //   if (callBack) callBack(error);
        //                     // }
        //                     // });
        //                     // }
        //                     // );
        //                   }
        //               });

        //             });
        //           }
        //         );
        //       });
        //     });

        //   } catch (error) {
        //     if (callBack) callBack(error);
        //   } finally {
        //     if (conn_ora) await conn_ora.close();
        //     if (pool_ora) await pool_ora.close();
        //   }
        // };













    )
}
//17/06/2025 ******************************
// const InsertKmcMedDesc = async (callBack) => {
//   let pool_ora, conn_ora;

//   try {
//     pool_ora = await oraKmcConnection();
//     conn_ora = await pool_ora.getConnection();

//     const meddescData = await getMedDescData();

//     const detail = await getBisKmcLastTriggerDate();
//     const lastUpdateDate = detail?.last_trgrt_date ? new Date(detail?.last_trgrt_date) : subMonths(new Date(), 1);

//     const fromDate = format(lastUpdateDate, 'dd/MM/yyyy HH:mm:ss');
//     const toDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
//     // const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//     // const trgr_frmDate = format(lastUpdateDate, 'yyyy-MM-dd HH:mm:ss');

//     const oracleSql = `
//       SELECT meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, meddesc.itn_strip,
//              medcategory.mc_code, medcategory.mcc_desc, medgroup.mg_code, medgroup.mgc_desc,
//              medgencomb.cmc_desc, medtype.mtc_desc,
//              DECODE(meddesc.itc_medicine,'N','No','Y','MEDICINE') AS MEDICINE,
//              DECODE(meddesc.itc_consumable,'N','No','Y','CONSUM') AS CONSUMABLE,
//              DECODE(meddesc.itc_highvalue,'N',' ','Y','VALUE') AS HIGH_VALUE,
//              DECODE(meddesc.itc_highrisk,'N',' ','Y','HIGH_RISK') AS HIGH_RISK,
//              DECODE(meddesc.itc_hazardous,'N',' ','Y','HAZARDOUS') AS HAZARDOUS,
//              DECODE(meddesc.itc_ved,'N','None','V','Vital','E','Essential','D','Desirable') AS VED,
//              DECODE(meddesc.itc_breakable,'N','No','Y','Yes') AS BREAKABLE,
//              meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//              meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper,
//              meddesc.itd_date, meddesc.itd_eddate
//       FROM MEDDESC
//       RIGHT JOIN (SELECT DISTINCT(IT_CODE) FROM MEDSTORE) B ON MEDDESC.IT_CODE = B.IT_CODE
//       LEFT JOIN medcategory ON meddesc.mc_code = medcategory.mc_code
//       LEFT JOIN medgroup ON meddesc.mg_code = medgroup.mg_code
//       LEFT JOIN medtype ON meddesc.mt_code = medtype.mt_code
//       LEFT JOIN medstore ON meddesc.it_code = medstore.it_code
//       LEFT JOIN pstparam ON medstore.st_code = pstparam.st_code
//       LEFT JOIN medgencomb ON meddesc.cm_code = medgencomb.cm_code
//       WHERE MEDDESC.ITC_STATUS = 'Y' AND meddesc.itd_date 
//         BETWEEN TO_DATE(:FROM_DATE, 'dd/MM/yyyy hh24:mi:ss') AND TO_DATE(:TO_DATE, 'dd/MM/yyyy hh24:mi:ss')
//       GROUP BY meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, medcategory.mc_code, medcategory.mcc_desc,
//                medgroup.mg_code, medgroup.mgc_desc, medtype.mt_code, medtype.mtc_desc, meddesc.itc_assestitem,
//                meddesc.itc_medicine, meddesc.itc_consumable, meddesc.itc_highvalue, meddesc.itc_highrisk,
//                meddesc.itc_hazardous, medgencomb.cmc_desc, meddesc.itc_ved, meddesc.itn_strip,
//                meddesc.itc_breakable, meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//                meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper, meddesc.itd_date,
//                meddesc.itd_eddate`;

//     const result = await conn_ora.execute(
//       oracleSql,
//       { FROM_DATE: fromDate, TO_DATE: toDate },
//       { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
//     );

//     const rows = await result.resultSet.getRows();
//     await result.resultSet.close();

//     if (!rows || rows.length === 0) {
//       if (callBack) callBack(null, "No data to process.");
//       return;
//     }

//     const Values = rows.map(store => [
//       store.IT_CODE, store.ITC_DESC, store.ITC_ALIAS, store.ITN_STRIP,
//       store.MC_CODE, store.MCC_DESC, store.MG_CODE, store.MGC_DESC,
//       store.CMC_DESC, store.MTC_DESC, store.MEDICINE, store.CONSUMABLE,
//       store.HIGH_VALUE, store.HIGH_RISK, store.HAZARDOUS, store.VED,
//       store.BREAKABLE, store.ITN_BREAKQTY, store.ITN_LPRATE, store.ITN_MRP,
//       store.ITN_ORIGINALMRP, store.ITN_GENDISPER, store.ITN_GENIPDISPER,
//       store.ITD_DATE, store.ITD_EDDATE
//     ]);

//     const mysqlConn = await getConnection(bispool);
//     await beginTransaction(mysqlConn);

//     // try {
//     // if (!meddescData || meddescData.length === 0) {
//     const insertQuery = `
//           INSERT INTO bis_kmc_med_desc_mast (
//             it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc,
//             mg_code, mgc_desc, cmc_desc, mtc_desc, itc_medicine, itc_consumable,
//             itc_highvalue, itc_highrisk, itc_hazardous, itc_ved, itc_breakable,
//             itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp, itn_gendisper,
//             itn_genipdisper, create_date, edit_date
//           ) VALUES ?`;
//     await queryPromise(mysqlConn, insertQuery, [Values]);

    // const medstoreResult = await conn_ora.execute(`
    //     SELECT IT_CODE, ST_CODE FROM MEDSTORE
    //     WHERE IT_CODE IN (SELECT IT_CODE FROM MEDDESC WHERE ITC_STATUS = 'Y')
    //   `, [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    // const medstoreRows = await medstoreResult.resultSet.getRows();
    // await medstoreResult.resultSet.close();

    // if (medstoreRows?.length) {
    //   const medstoreValues = medstoreRows.map(r => [r.IT_CODE, r.ST_CODE]);
    //   await queryPromise(mysqlConn, `
    //       INSERT INTO bis_kmc_med_store(it_code, st_code) VALUES ?`, [medstoreValues]);
    // }
    // } else {
    //   const updateQuery = `
    //       INSERT INTO bis_kmc_med_desc_mast (
    //       it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc, mg_code, mgc_desc, 
    //       cmc_desc, mtc_desc, itc_medicine, itc_consumable, itc_highvalue, itc_highrisk, itc_hazardous,
    //       itc_ved, itc_breakable, itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp, itn_gendisper, 
    //       itn_genipdisper, create_date, edit_date
    //       ) VALUES ?`;
    //   await queryPromise(mysqlConn, updateQuery, [Values]);
    // }

    // await queryPromise(mysqlConn, `
    //     UPDATE bis_kmc_trigger_details
    //     SET trgr_from_date = ?, last_trgrt_date = ? WHERE trgr_slno = 1`,
    //   [trgr_frmDate, currentDate]);

    // await commit(mysqlConn);
    // mysqlConn.release();

    // if (callBack) callBack(null, "Sync completed.");
    // } catch (err) {
    //   console.log("err", err);

    //   await rollback(mysqlConn);
    //   mysqlConn.release();
    //   console.error("Transaction error:", err);
    //   if (callBack) callBack(err);
    // }

//   } catch (err) {
//     console.error("Outer error:", err);
//     if (callBack) callBack(err);
//   }
// };


// ****************************************17-06-2025----------------------------------------
// const InsertKmcMedDesc = async (callBack) => {
//   let pool_ora, conn_ora, mysqlConn, pool_ora1, conn_ora1;

//   try {
//     // Oracle connection
//     pool_ora = await oraKmcConnection();
//     conn_ora = await pool_ora.getConnection();

//     const detail = await getBisKmcLastTriggerDate();
//     const lastUpdateDate = detail?.last_insert_date ? new Date(detail?.last_insert_date) : subMonths(new Date(), 1);
//     const fromDate = format(lastUpdateDate, 'yyyy-MM-dd HH:mm:ss');
//     const toDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

//     const oracleSql = `
//       SELECT meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, meddesc.itn_strip,
//              medcategory.mc_code, medcategory.mcc_desc, medgroup.mg_code, medgroup.mgc_desc,
//              medgencomb.cmc_desc, medtype.mtc_desc,
//              DECODE(meddesc.itc_medicine,'N','No','Y','MEDICINE') AS MEDICINE,
//              DECODE(meddesc.itc_consumable,'N','No','Y','CONSUM') AS CONSUMABLE,
//              DECODE(meddesc.itc_highvalue,'N',' ','Y','VALUE') AS HIGH_VALUE,
//              DECODE(meddesc.itc_highrisk,'N',' ','Y','HIGH_RISK') AS HIGH_RISK,
//              DECODE(meddesc.itc_hazardous,'N',' ','Y','HAZARDOUS') AS HAZARDOUS,
//              DECODE(meddesc.itc_ved,'N','None','V','Vital','E','Essential','D','Desirable') AS VED,
//              DECODE(meddesc.itc_breakable,'N','No','Y','Yes') AS BREAKABLE,
//              meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//              meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper,
//              meddesc.itd_date, meddesc.itd_eddate
//       FROM MEDDESC
//       RIGHT JOIN (SELECT DISTINCT(IT_CODE) FROM MEDSTORE) B ON MEDDESC.IT_CODE = B.IT_CODE
//       LEFT JOIN medcategory ON meddesc.mc_code = medcategory.mc_code
//       LEFT JOIN medgroup ON meddesc.mg_code = medgroup.mg_code
//       LEFT JOIN medtype ON meddesc.mt_code = medtype.mt_code
//       LEFT JOIN medstore ON meddesc.it_code = medstore.it_code
//       LEFT JOIN pstparam ON medstore.st_code = pstparam.st_code
//       LEFT JOIN medgencomb ON meddesc.cm_code = medgencomb.cm_code
//       WHERE MEDDESC.ITC_STATUS = 'Y' AND meddesc.itd_date 
//         BETWEEN TO_DATE(:FROM_DATE, 'yyyy-mm-dd hh24:mi:ss') AND TO_DATE(:TO_DATE, 'yyyy-mm-dd hh24:mi:ss')
//       GROUP BY meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, medcategory.mc_code, medcategory.mcc_desc,
//                medgroup.mg_code, medgroup.mgc_desc, medtype.mt_code, medtype.mtc_desc, meddesc.itc_assestitem,
//                meddesc.itc_medicine, meddesc.itc_consumable, meddesc.itc_highvalue, meddesc.itc_highrisk,
//                meddesc.itc_hazardous, medgencomb.cmc_desc, meddesc.itc_ved, meddesc.itn_strip,
//                meddesc.itc_breakable, meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//                meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper, meddesc.itd_date,
//                meddesc.itd_eddate`;

//     const result = await conn_ora.execute(
//       oracleSql,
//       { FROM_DATE: fromDate, TO_DATE: toDate },
//       { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
//     );

//     const rows = await result.resultSet.getRows();
//     await result.resultSet.close();

//     if (!rows || rows.length === 0) {
//       if (callBack) callBack(null, "No data to process.");
//       return;
//     }

//     const Values = rows.map(store => [
//       store.IT_CODE, store.ITC_DESC, store.ITC_ALIAS, store.ITN_STRIP,
//       store.MC_CODE, store.MCC_DESC, store.MG_CODE, store.MGC_DESC,
//       store.CMC_DESC, store.MTC_DESC, store.MEDICINE, store.CONSUMABLE,
//       store.HIGH_VALUE, store.HIGH_RISK, store.HAZARDOUS, store.VED,
//       store.BREAKABLE, store.ITN_BREAKQTY, store.ITN_LPRATE, store.ITN_MRP,
//       store.ITN_ORIGINALMRP, store.ITN_GENDISPER, store.ITN_GENIPDISPER,
//       store.ITD_DATE, store.ITD_EDDATE
//     ]);

//     const insertQuery = `
//       INSERT INTO bis_kmc_med_desc_mast (
//         it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc,
//         mg_code, mgc_desc, cmc_desc, mtc_desc, itc_medicine, itc_consumable,
//         itc_highvalue, itc_highrisk, itc_hazardous, itc_ved, itc_breakable,
//         itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp, itn_gendisper,
//         itn_genipdisper, create_date, edit_date
//       ) VALUES ?`;

//     mysqlConn = await getConnection(bispool);
//     await beginTransaction(mysqlConn);

//     // Insert the data
//     await new Promise((resolve, reject) => {
//       mysqlConn.query(insertQuery, [Values], (err, results) => {
//         if (err) return reject(err);
//         resolve(results);
//       });
//     });

//     // After successful insert, fetch inserted data
//     const insertedRows = await new Promise(async (resolve, reject) => {
//       const selectQuery = `
//     SELECT it_code
//     FROM bis_kmc_med_desc_mast 
//     WHERE create_date BETWEEN ? AND ?`;

//       mysqlConn.query(selectQuery, [fromDate, toDate], async (err, results) => {
//         if (err) return reject(err);

//         const numericItcodes = results?.map(val => val.it_code);

//         // console.log("numericItcodes", numericItcodes);

//         if (!numericItcodes || numericItcodes.length === 0) {
//           console.log("No it_codes found.");
//           return resolve([]);
//         }

//         // Helper: Split array into chunks of 1000
//         const chunkArray = (array, size) => {
//           const result = [];
//           for (let i = 0; i < array.length; i += size) {
//             result.push(array.slice(i, i + size));
//           }
//           return result;
//         };

//         const chunks = chunkArray(numericItcodes, 1000);
//         let allRows = [];

//         try {
//           for (const chunk of chunks) {
//             const bindParams = {};
//             const bindKeys = chunk.map((code, index) => {
//               const key = `val${index}`;
//               bindParams[key] = code;
//               return `:${key}`;
//             });

//             const medstoreqry = `
//           SELECT MEDSTORE.IT_CODE, MEDSTORE.ST_CODE
//           FROM MEDDESC
//           LEFT JOIN MEDSTORE ON MEDDESC.IT_CODE = MEDSTORE.IT_CODE
//           WHERE MEDDESC.ITC_STATUS = 'Y' AND MEDDESC.IT_CODE IN (${bindKeys.join(', ')})
//         `;

//             const result2 = await conn_ora.execute(
//               medstoreqry,
//               bindParams,
//               { outFormat: oracledb.OUT_FORMAT_OBJECT }
//             );

//             if (result2?.rows?.length) {
//               allRows.push(...result2.rows);
//             }
//           }

//           if (allRows.length > 0) {
//             const medstoreValues = allRows.map(store => [store.IT_CODE, store.ST_CODE]);

//             bispool.getConnection((err, bisConnection) => {
//               if (err) return callBack?.(err);

//               bisConnection.beginTransaction(err => {
//                 if (err) {
//                   bisConnection.release();
//                   return callBack?.(err);
//                 }


//                 bisConnection.query(
//                   `INSERT INTO bis_kmc_med_store(it_code, st_code) VALUES ?`,
//                   [medstoreValues],
//                   (err, result) => {
//                     if (err) {
//                       return bisConnection.rollback(() => {
//                         bisConnection.release();
//                         if (callBack) callBack(err);
//                       });
//                     }

//                     bisConnection.commit(commitErr => {
//                       if (commitErr) {
//                         bisConnection.rollback(() => bisConnection.release());
//                         return callBack?.(commitErr);
//                       }

//                       bisConnection.release(); // release after commit

//                       // Step 3: Now call updateMedDesc
//                       updateMedDesc(async (updateErr, msg) => {
//                         if (updateErr) {
//                           console.error('Update failed:', updateErr);
//                           return callBack?.(updateErr);
//                         }

//                         // console.log(msg);

//                         // // Step 4: New connection for trigger update
//                         // bispool.getConnection((err, triggerConn) => {
//                         //   if (err) return callBack?.(err);

//                         //   const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

//                         //   triggerConn.beginTransaction(err => {
//                         //     if (err) {
//                         //       triggerConn.release();
//                         //       return callBack?.(err);
//                         //     }

//                         //     triggerConn.query(
//                         //       `UPDATE bis_kmc_trigger_details 
//                         //        SET last_insert_date = ?, last_update_date = ? 
//                         //        WHERE trgr_slno = 1`,
//                         //       [currentDate, currentDate],
//                         //       (err) => {
//                         //         if (err) {
//                         //           console.log("err", err);

//                         //           return triggerConn.rollback(() => {
//                         //             triggerConn.release();
//                         //             callBack?.(err);
//                         //           });
//                         //         }

//                         //         triggerConn.commit(err => {
//                         //           triggerConn.release();
//                         //           if (err) return callBack?.(err);
//                         //           return callBack?.(null, "Update and trigger success");
//                         //         });
//                         //       }
//                         //     );
//                         //   });
//                         // });




//                       });
//                     });
//                   }
//                 );


//               });
//             });
//           } else {
//             callBack?.(null, "No medstore data to insert.");
//           }

//           // --------------------
//           // Update Function
//           // --------------------
//           // const GetUpdateDatas = `
//           //       SELECT meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, meddesc.itn_strip,
//           //              medcategory.mc_code, medcategory.mcc_desc, medgroup.mg_code, medgroup.mgc_desc,
//           //              medgencomb.cmc_desc, medtype.mtc_desc,
//           //              DECODE(meddesc.itc_medicine,'N','No','Y','MEDICINE') AS MEDICINE,
//           //              DECODE(meddesc.itc_consumable,'N','No','Y','CONSUM') AS CONSUMABLE,
//           //              DECODE(meddesc.itc_highvalue,'N',' ','Y','VALUE') AS HIGH_VALUE,
//           //              DECODE(meddesc.itc_highrisk,'N',' ','Y','HIGH_RISK') AS HIGH_RISK,
//           //              DECODE(meddesc.itc_hazardous,'N',' ','Y','HAZARDOUS') AS HAZARDOUS,
//           //              DECODE(meddesc.itc_ved,'N','None','V','Vital','E','Essential','D','Desirable') AS VED,
//           //              DECODE(meddesc.itc_breakable,'N','No','Y','Yes') AS BREAKABLE,
//           //              meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//           //              meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper,
//           //              meddesc.itd_date, meddesc.itd_eddate
//           //       FROM MEDDESC
//           //       RIGHT JOIN (SELECT DISTINCT(IT_CODE) FROM MEDSTORE) B ON MEDDESC.IT_CODE = B.IT_CODE
//           //       LEFT JOIN medcategory ON meddesc.mc_code = medcategory.mc_code
//           //       LEFT JOIN medgroup ON meddesc.mg_code = medgroup.mg_code
//           //       LEFT JOIN medtype ON meddesc.mt_code = medtype.mt_code
//           //       LEFT JOIN medstore ON meddesc.it_code = medstore.it_code
//           //       LEFT JOIN pstparam ON medstore.st_code = pstparam.st_code
//           //       LEFT JOIN medgencomb ON meddesc.cm_code = medgencomb.cm_code
//           //       WHERE MEDDESC.ITC_STATUS = 'Y' AND meddesc.itd_date 
//           //         BETWEEN TO_DATE(:FROM_DATE, 'yyyy-mm-dd hh24:mi:ss') AND TO_DATE(:TO_DATE, 'yyyy-mm-dd hh24:mi:ss')
//           //       GROUP BY meddesc.it_code, meddesc.itc_desc, meddesc.itc_alias, medcategory.mc_code, medcategory.mcc_desc,
//           //                medgroup.mg_code, medgroup.mgc_desc, medtype.mt_code, medtype.mtc_desc, meddesc.itc_assestitem,
//           //                meddesc.itc_medicine, meddesc.itc_consumable, meddesc.itc_highvalue, meddesc.itc_highrisk,
//           //                meddesc.itc_hazardous, medgencomb.cmc_desc, meddesc.itc_ved, meddesc.itn_strip,
//           //                meddesc.itc_breakable, meddesc.itn_breakqty, meddesc.itn_lprate, meddesc.itn_mrp,
//           //                meddesc.itn_originalmrp, meddesc.itn_gendisper, meddesc.itn_genipdisper, meddesc.itd_date,
//           //                meddesc.itd_eddate`;


//           // async function updateMedDesc(callback) {
//           //   let oraPool, oraConn;

//           //   try {
//           //     oraPool = await oraKmcConnection();
//           //     oraConn = await oraPool.getConnection();

//           //     const detail = await getBisKmcLastTriggerDate();
//           //     const lastUpdateDate = detail?.last_insert_date ? new Date(detail.last_insert_date) : subMonths(new Date(), 1);
//           //     const fromDate = format(lastUpdateDate, 'yyyy-MM-dd HH:mm:ss');
//           //     const toDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

//           //     const result = await oraConn.execute(GetUpdateDatas, {
//           //       FROM_DATE: fromDate,
//           //       TO_DATE: toDate
//           //     }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

//           //     const rows = result.rows;
//           //     if (!rows?.length) return callback?.(null, 'No records to update');

//           //     bispool.getConnection((err, bisConnection) => {
//           //       if (err) return callback?.(err);

//           //       bisConnection.beginTransaction(async err => {
//           //         if (err) {
//           //           bisConnection.release();
//           //           return callback?.(err);
//           //         }

//           //         try {


//           //           const params = rows.map(store => [
//           //             store.IT_CODE, store.ITC_DESC, store.ITC_ALIAS, store.ITN_STRIP,
//           //             store.MC_CODE, store.MCC_DESC, store.MG_CODE, store.MGC_DESC,
//           //             store.CMC_DESC, store.MTC_DESC, store.MEDICINE, store.CONSUMABLE,
//           //             store.HIGH_VALUE, store.HIGH_RISK, store.HAZARDOUS, store.VED,
//           //             store.BREAKABLE, store.ITN_BREAKQTY, store.ITN_LPRATE, store.ITN_MRP,
//           //             store.ITN_ORIGINALMRP, store.ITN_GENDISPER, store.ITN_GENIPDISPER,
//           //             store.ITD_DATE, store.ITD_EDDATE
//           //           ]);
//           //           const updateQuery = `
//           //   UPDATE bis_kmc_med_desc_mast 
//           //   SET 
//           //     it_code=?, itc_desc=?, itc_alias=?, itn_strip=?, mc_code=?, mcc_desc=?, mg_code=?, mgc_desc=?, cmc_desc=?, mtc_desc=?, itc_medicine=?, itc_consumable=?, itc_highvalue=?, itc_highrisk=?, itc_hazardous=?, itc_ved=?, itc_breakable=?, itn_breakqty=?, itn_lprate=?, itn_mrp=?, itn_originalmrp=?, itn_gendisper=?, itn_genipdisper=?, create_date=?, edit_date=?
//           //   WHERE edit_date BETWEEN ? AND ?
//           // `;
//           //           await new Promise((resolve, reject) => {
//           //             bisConnection.query(updateQuery, params, (err) => {
//           //               if (err) reject(err);
//           //               else resolve();
//           //             });
//           //           });
//           //           // }

//           //           const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//           //           bisConnection.query(
//           //             `UPDATE bis_kmc_trigger_details 
//           //              SET last_insert_date = ?, last_update_date = ? 
//           //              WHERE trgr_slno = 1`,
//           //             [currentDate, currentDate],
//           //             (err) => {
//           //               if (err) {
//           //                 return bisConnection.rollback(() => {
//           //                   bisConnection.release();
//           //                   callback?.(err);
//           //                 });
//           //               }

//           //               bisConnection.commit(err => {
//           //                 bisConnection.release();
//           //                 if (err) return callback?.(err);
//           //                 return callback?.(null, "Update and trigger success");
//           //               });
//           //             }
//           //           );
//           //         } catch (err) {
//           //           bisConnection.rollback(() => bisConnection.release());
//           //           callback?.(err);
//           //         }
//           //       });
//           //     });
//           //   } catch (err) {
//           //     if (oraConn) await oraConn.close();
//           //     callback?.(err);
//           //   }
//           // }






//           resolve(allRows);

//         } catch (oracleErr) {
//           console.error("Oracle error:", oracleErr);
//           reject(oracleErr);
//         }
//       });
//     });

//     await commit(mysqlConn);
//     if (callBack) callBack(null, insertedRows);
//   } catch (err) {
//     if (mysqlConn) await rollback(mysqlConn);
//     console.error("InsertKmcMedDesc Error:", err);
//     if (callBack) callBack(err);
//   } finally {
//     if (conn_ora) await conn_ora.close();
//     if (mysqlConn) mysqlConn.release();
//   }
// };


// // Run cron every minute
// cron.schedule("* * * * *", () => {
//   InsertKmcMedDesc();
// });


//tmch statictics

// import { Box, Button, ButtonGroup, Card, CardContent, Chip, Divider, Typography } from '@mui/joy'
// import React, { Fragment, memo, useCallback, useState } from 'react'
// import KMCHeader from '../../BIS_CommoCode/KMCHeader'
// import QuotationDetails from './QuotationDetails'
// import { Bar } from 'react-chartjs-2'
// import { format, startOfMonth, subMonths } from 'date-fns'
// import { getActiveItems } from '../../../../api/commonAPI'
// import { useQuery } from '@tanstack/react-query';

// const Tmc_Quotation_Statics = () => {

//     const [open, SetOpen] = useState(false);
//     const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//     const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//     const [category, setCategory] = useState('');

//     const { data: ActiveItems } = useQuery({
//         queryKey: ["qtnActiveItems"],
//         queryFn: () => getActiveItems(),
//     })
//     // console.log("ActiveItems", ActiveItems);
//     const categoryMap = {
//         '0124': 'Sales',
//         '0116': 'Consumables/Surgicals',
//         '0038': 'Biomedical',
//         '0036': 'General',
//         'C004': 'Dental'
//     };

//     const categories = Object.keys(categoryMap).map(stCode => {
//         const item = ActiveItems?.find(item => item.ST_CODE === stCode);
//         return {
//             name: categoryMap[stCode],
//             count: item?.ITEM_COUNT || 0
//         };
//     });

//     const totalCount = ActiveItems?.reduce((sum, item) => sum + item.ITEM_COUNT, 0) || 0;

//     // { ST_CODE: '0124', ITEM_COUNT: 10642 }
//     // { ST_CODE: '0116', ITEM_COUNT: 8610 }
//     // { ST_CODE: '0038', ITEM_COUNT: 3189 }
//     // { ST_CODE: '0036', ITEM_COUNT: 6541 }
//     // { ST_CODE: 'C004', ITEM_COUNT: 1586 }

//     //  Sales           - 0124 ( Central Store Pharmacy)
//     //  Consumables     - 0116 ( Consumable Store )
//     //  Biomedical      - 0038 (Biomedical Store) 
//     //  General Store   - 0036 (General Store)
//     //  Dental          - C004 (CRS Dental)


//     const ShowDetails = useCallback(() => {
//         SetOpen(true);
//     }, []);

//     const [chartData, setChartData] = useState({
//         labels: ['Jun'], // 👈 only this month label
//         datasets: [
//             { label: 'Sales', data: [25] },            // 👈 this month's value
//             { label: 'Consumable/Surgicals', data: [18] },
//             { label: 'Biomedical', data: [10] },
//             { label: 'General', data: [15] },
//             { label: 'Dental', data: [5] },
//         ],
//     });
//     const filteredChartData = category
//         ? {
//             labels: chartData.labels,
//             datasets: chartData.datasets.filter((ds) => ds.label === category),
//         }
//         : chartData;

//     const handlePeriodChange = useCallback((type) => {
//         let newFromDate;
//         const today = new Date();

//         switch (type) {
//             case 1:
//                 newFromDate = startOfMonth(today);
//                 break;
//             case 2:
//                 newFromDate = subMonths(today, 6);
//                 break;
//             case 3:
//                 newFromDate = new Date(today.getFullYear(), 0, 1);
//                 break;
//             default:
//                 newFromDate = today;
//         }

//         const formattedFrom = format(newFromDate, 'yyyy-MM-dd');
//         const formattedTo = format(today, 'yyyy-MM-dd');

//         setFromDate(formattedFrom);
//         setToDate(formattedTo);

//         filterChartDataByDate(formattedFrom, formattedTo, type);
//     }, []);

//     const filterChartDataByDate = useCallback((from, to, type) => {
//         let mockFilteredData;

//         if (type === 1) {
//             mockFilteredData = {
//                 labels: ['Jun'],
//                 datasets: [
//                     { label: 'Sales', data: [25] },            // 👈 this month's value
//                     { label: 'Consumable/Surgicals', data: [18] },
//                     { label: 'Biomedical', data: [10] },
//                     { label: 'General', data: [15] },
//                     { label: 'Dental', data: [5] },
//                 ],
//             };
//         } else if (type === 2) {
//             mockFilteredData = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//                 datasets: [
//                     { label: 'Sales', data: [10, 15, 20, 25, 30, 25] },
//                     { label: 'Consumable/Surgicals', data: [8, 12, 18, 22, 28, 18] },
//                     { label: 'Biomedical', data: [5, 10, 15, 20, 25, 10] },
//                     { label: 'General', data: [4, 8, 12, 16, 20, 15] },
//                     { label: 'Dental', data: [2, 5, 8, 11, 14, 5] },
//                 ],
//             };
//         } else if (type === 3) {
//             mockFilteredData = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//                 datasets: [
//                     { label: 'Pharmacy', data: [12, 17, 22, 27, 32, 25] },
//                     { label: 'Consumable/Surgicals', data: [10, 14, 19, 23, 29, 18] },
//                     { label: 'Biomedical', data: [6, 11, 16, 21, 26, 10] },
//                     { label: 'General', data: [3, 7, 11, 15, 19, 15] },
//                     { label: 'Dental', data: [1, 4, 7, 10, 13, 5] },
//                 ],
//             };
//         }

//         setChartData(mockFilteredData);
//     }, []);

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     boxWidth: 15,
//                     color: 'rgb(var(--color-white))',
//                     font: { size: 12 },
//                     padding: 20,
//                     usePointStyle: true,
//                 },
//             },
//             tooltip: {
//                 enabled: true,
//                 backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                 titleColor: '#fff',
//                 bodyColor: '#fff',
//                 borderColor: 'rgba(255, 255, 255, 0.1)',
//                 borderWidth: 1,
//                 padding: 12,
//                 callbacks: {
//                     label: (context) => {
//                         return `${context.dataset.label}: ${context.raw}`;
//                     },
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 barThickness: 50,
//                 grid: { display: false },
//                 ticks: {
//                     color: 'rgba(var(--font-light))',
//                     autoSkip: false,
//                     font: { size: 10, family: "'Roboto', sans-serif" },
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     color: 'rgba(var(--font-light))',
//                     font: { size: 10, family: "'Roboto', sans-serif" },
//                 },
//             },
//         },
//     };

//     const totalValue = chartData.datasets.reduce((sum, dataset) => sum + (dataset.data[0] || 0), 0);

//     return (
//         <Fragment>
//             {open === true ? <QuotationDetails open={open} SetOpen={SetOpen} />
//                 :
//                 <Box sx={{ p: 2, bgcolor: "white" }}>
//                     <KMCHeader />
//                     <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                         <Card
//                             sx={{
//                                 flex: 1,
//                                 borderRadius: 4,
//                                 boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//                                 background: '#fefefe',
//                                 p: 2
//                             }}
//                         >
//                             <CardContent>
//                                 <Typography
//                                     variant="overline"
//                                     sx={{
//                                         fontWeight: 500,
//                                         fontSize: 13,
//                                         letterSpacing: 1,
//                                         color: "#27548A"
//                                     }}
//                                 >
//                                     ACTIVE ITEMS
//                                 </Typography>

//                                 <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
//                                     <Typography
//                                         variant="h2"
//                                         sx={{
//                                             fontWeight: 600,
//                                             fontSize: 20,
//                                             color: 'primary.main',
//                                             mr: 1
//                                         }}
//                                     >
//                                         {totalCount}
//                                     </Typography>
//                                     <Typography>Total</Typography>
//                                 </Box>

//                                 <Divider />

//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
//                                     {categories.map((category, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                                 p: 0.2,
//                                                 mt: index === 0 ? 0.5 : 0,
//                                                 borderRadius: 2,
//                                                 backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
//                                             }}
//                                         >
//                                             <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }}>
//                                                 {category.name}
//                                             </Box>
//                                             <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                                 <Chip variant='soft' sx={{ width: 100 }}>
//                                                     {category.count}
//                                                 </Chip>
//                                             </Box>
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             </CardContent>
//                         </Card>


//                         <Card
//                             sx={{
//                                 flex: 1,
//                                 borderRadius: 4,
//                                 boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//                                 background: '#fefefe',
//                                 p: 2
//                             }}
//                         >
//                             <CardContent>
//                                 <Typography
//                                     variant="overline"
//                                     sx={{
//                                         fontWeight: 500,
//                                         fontSize: 13,
//                                         letterSpacing: 1,
//                                         color: "#27548A"
//                                     }}
//                                 >
//                                     ITEMS (QUOTATION LINKED)
//                                 </Typography>

//                                 <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, }}>
//                                     <Typography
//                                         variant="h2"
//                                         sx={{
//                                             fontWeight: 600,
//                                             fontSize: 20,
//                                             color: 'primary.main',
//                                             mr: 1
//                                         }}
//                                     >
//                                         4325
//                                     </Typography>
//                                     <Typography sx={{}}>Total</Typography>
//                                 </Box>

//                                 <Divider sx={{}} />
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             mt: .5,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Sales
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 36
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#f5f5f5'
//                                         }}
//                                     >

//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Consumable/Surgical
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 695
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Biomedical
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 123
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#f5f5f5'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             General
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 4258
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Dental
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 1478
//                                             </Chip>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </CardContent>
//                         </Card>

//                         <Card
//                             sx={{
//                                 flex: 2,
//                                 borderRadius: 4,
//                                 boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//                                 background: '#fefefe',
//                                 p: 2,
//                             }}
//                         >
//                             <CardContent>
//                                 <Typography
//                                     variant="overline"
//                                     sx={{

//                                         fontWeight: 500,
//                                         fontSize: 13,
//                                         letterSpacing: 1,
//                                         color: "#27548A"
//                                     }}
//                                 >
//                                     TOTAL QUOTATION
//                                 </Typography>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         mt: 1,
//                                         px: 1,
//                                         fontSize: 13,
//                                         fontWeight: 500,
//                                     }}
//                                 >
//                                     <Box sx={{ flex: 1, display: 'flex', }}>
//                                         <Typography
//                                             variant="h2"
//                                             sx={{

//                                                 fontWeight: 600,
//                                                 fontSize: 20,
//                                                 color: 'primary.main',
//                                                 mr: 1
//                                             }}
//                                         >
//                                             612
//                                         </Typography>
//                                         <Typography sx={{ pt: .5 }}>Total</Typography>
//                                     </Box>

//                                     <Box sx={{ width: 80, textAlign: 'right', pt: 1 }}>Finalized</Box>
//                                     <Box sx={{ width: 100, textAlign: 'right', pl: 1, pt: 1 }}>Not Finalized</Box>
//                                 </Box>

//                                 <Divider sx={{}} />
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5, px: 1 }}>
//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             mt: .5,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Sales
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{
//                                                 cursor: "pointer", "&:hover": {
//                                                     color: "green",
//                                                     textDecoration: "underline"
//                                                 }
//                                             }} onClick={ShowDetails}>
//                                                 23
//                                             </Chip>
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 26
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#f5f5f5'
//                                         }}
//                                     >


//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Consumable/Surgicals
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{
//                                                 cursor: "pointer", "&:hover": {
//                                                     color: "green",
//                                                     textDecoration: "underline"
//                                                 }
//                                             }} onClick={ShowDetails}>

//                                                 45
//                                             </Chip>
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 69
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Biomedical
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{
//                                                 cursor: "pointer", "&:hover": {
//                                                     color: "green",
//                                                     textDecoration: "underline"
//                                                 }
//                                             }} onClick={ShowDetails}>

//                                                 412
//                                             </Chip>
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 12
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#f5f5f5'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             General
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{
//                                                 cursor: "pointer", "&:hover": {
//                                                     color: "green",
//                                                     textDecoration: "underline"
//                                                 }
//                                             }} onClick={ShowDetails}>

//                                                 0
//                                             </Chip>
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 0
//                                             </Chip>
//                                         </Box>
//                                     </Box>

//                                     <Box
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             p: .2,
//                                             borderRadius: 2,
//                                             backgroundColor: '#fafafa'
//                                         }}
//                                     >
//                                         <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
//                                             Dental
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{
//                                                 cursor: "pointer", "&:hover": {
//                                                     color: "green",
//                                                     textDecoration: "underline"
//                                                 }
//                                             }} onClick={ShowDetails}>

//                                                 23
//                                             </Chip>
//                                         </Box>
//                                         <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
//                                             <Chip variant='soft' sx={{ width: 100 }}>
//                                                 36
//                                             </Chip>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                         <Card
//                             sx={{
//                                 flex: 1,
//                                 borderRadius: 4,
//                                 boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//                                 background: '#fefefe',
//                                 p: 2,
//                             }}
//                         >
//                             <CardContent>
//                                 <Typography
//                                     variant="overline"
//                                     sx={{
//                                         fontWeight: 500,
//                                         fontSize: 13,
//                                         letterSpacing: 1,
//                                         color: "#27548A"
//                                     }}
//                                 >
//                                     NEW ITEM (THIS MONTH)
//                                 </Typography>

//                                 <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 1 }}>
//                                     <Typography
//                                         variant="h2"
//                                         sx={{
//                                             fontWeight: 600,
//                                             fontSize: 20,
//                                             color: 'primary.main',
//                                             mr: 1,
//                                         }}
//                                     >
//                                         {totalValue}
//                                     </Typography>

//                                     <Typography sx={{
//                                         mt: 0.5,
//                                         cursor: 'pointer',
//                                         '&:hover': {
//                                             color: 'green',
//                                             textDecoration: 'underline',
//                                         },
//                                     }} onClick={() => setCategory('')}>
//                                         Overall
//                                     </Typography>

//                                 </Box>
//                                 <Divider />
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>

//                                     {chartData?.datasets.map((dataset, index) => (
//                                         <Box
//                                             key={dataset.label}
//                                             sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                                 p: 0.2,
//                                                 borderRadius: 2,
//                                                 backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
//                                             }}
//                                         >
//                                             <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }}>{dataset.label}</Box>
//                                             <Box
//                                                 sx={{
//                                                     fontWeight: 500,
//                                                     width: 100,
//                                                     display: 'flex',
//                                                     justifyContent: 'flex-end',
//                                                 }}
//                                             >
//                                                 <Chip
//                                                     variant="soft"
//                                                     sx={{
//                                                         cursor: 'pointer',
//                                                         '&:hover': {
//                                                             color: 'green',
//                                                             textDecoration: 'underline',
//                                                         },
//                                                     }}
//                                                     onClick={() => setCategory(dataset.label)}
//                                                 >
//                                                     {dataset.data[0] || 0}
//                                                 </Chip>
//                                             </Box>
//                                         </Box>
//                                     ))}
//                                 </Box>

//                             </CardContent>
//                         </Card>
//                     </Box>
//                     <Typography
//                         variant="overline"
//                         sx={{
//                             fontWeight: 500,
//                             fontSize: 15,
//                             letterSpacing: 1,
//                             color: "#27548A",
//                             textAlign: "center",
//                             mt: 2
//                         }}
//                     >
//                         NEW ITEM
//                     </Typography>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
//                         <ButtonGroup
//                             aria-label="date range selector"
//                             sx={{
//                                 '--ButtonGroup-radius': '30px',
//                                 display: 'flex',
//                                 flexWrap: { sm: 'wrap', xl: 'nowrap' },
//                                 p: 0,
//                                 size: 'sm',
//                                 alignItems: "flex-end"
//                             }}
//                         >
//                             {['This Month', 'Last 6 months', 'This Year'].map((label, index) => (
//                                 <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
//                                     <Typography
//                                         sx={{
//                                             fontSize: 11,
//                                             color: '#507687',
//                                             '&:hover': {
//                                                 color: '#BE5B50',
//                                                 backgroundColor: 'transparent',
//                                             },
//                                         }}
//                                     >
//                                         {label}
//                                     </Typography>
//                                 </Button>
//                             ))}
//                         </ButtonGroup>

//                     </Box>
//                     <Box sx={{ height: 350, mt: 2 }}>
//                         <Bar
//                             data={{
//                                 labels: filteredChartData.labels,
//                                 datasets: filteredChartData.datasets.map((dataset, index) => ({
//                                     ...dataset,
//                                     backgroundColor: [
//                                         'rgba(96, 94, 163, 0.50)',
//                                         'rgba(12, 132, 162, 0.50)',
//                                         'rgba(184, 62, 143, 0.48)',
//                                     ][index % 3],
//                                     borderColor: [
//                                         'rgba(96, 94, 163, 1)',
//                                         'rgba(12, 132, 162, 1)',
//                                         'rgba(184, 62, 143, 1)',
//                                     ][index % 3],
//                                     borderWidth: 1,
//                                     barPercentage: 0.9,
//                                     categoryPercentage: 0.8,
//                                 })),
//                             }}
//                             options={options}
//                         />
//                     </Box>
//                 </Box>
//             }
//         </Fragment>
//     );
// }

// export default memo(Tmc_Quotation_Statics);
