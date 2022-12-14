import Axios from "axios";
import { useState } from "react";
import { getMockedData } from "../data/GetMockedData";

/**
 * Function that retrieve user data from the local API and save it in userData
 * @param {string} id User id
 * @param {object} userData State stocking the user data
 * @param {function} setUserData Function to change userData
 * @param {function} setDataLoaded State that became true when data is loaded
 * @return void
 */
export function getDataAPI(id, userData, setUserData, setDataLoaded) {

  /**
   * Current user on website
   * @type {object}
   */
  let user = {};

  Axios.get("http://localhost:3000/user/" + id)
    .then((response) => {
      if (response.status !== 200) return;
      user.id = response.data.data.id;
      user.firstName = response.data.data.userInfos.firstName;
      user.lastName = response.data.data.userInfos.lastName;
      user.age = response.data.data.userInfos.age;
      user.score = response.data.data.score;
      user.calorieCount = response.data.data.keyData.calorieCount;
      user.proteinCount = response.data.data.keyData.proteinCount;
      user.carbohydrateCount = response.data.data.keyData.carbohydrateCount;
      user.lipidCount = response.data.data.keyData.lipidCount;
    })
    .catch(function (error) {
      console.log("Redirect API towards mocked datas");
      getMockedData(id, userData, setUserData, setDataLoaded);
    });

  Axios.get("http://localhost:3000/user/" + id + "/activity")
    .then((response) => {
      if (response.status !== 200) return;
      user.sessions = response.data.data.sessions;
    })
    .catch(function (error) {
      console.log("Redirect API towards mocked datas");
    });

  Axios.get("http://localhost:3000/user/" + id + "/average-sessions")
    .then((response) => {
      if (response.status !== 200) return;
      user.sessionsLength = response.data.data.sessions;
    })
    .catch(function (error) {
      console.log("Redirect API towards mocked datas");
    });

  Axios.get("http://localhost:3000/user/" + id + "/performance")
    .then((response) => {
      if (response.status !== 200) return;
      user.kind = response.data.data.kind;
      user.kindData = response.data.data.data;
      setUserData(user);
      setDataLoaded(true);
    })
    .catch(function (error) {
      console.log("Redirect API towards mocked datas");
    });
}
