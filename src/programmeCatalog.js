export const PROGRAMMES = Object.freeze({
  recreational_4_7: {label:"Recreational Gymnastics (4–7)",pricePence:5700,mode:"single_slot",invitation:false,ageMin:4,ageMax:7},
  recreational_6_8: {label:"Recreational Gymnastics (6–8)",pricePence:3500,mode:"single_slot",invitation:false,ageMin:6,ageMax:8},
  recreational_6_12: {label:"Recreational Gymnastics (6–12)",pricePence:3500,mode:"single_slot",invitation:false,ageMin:6,ageMax:12},
  recreational_7_12: {label:"Recreational Gymnastics (7–12)",pricePence:3500,mode:"single_slot",invitation:false,ageMin:7,ageMax:12},
  recreational_plus: {label:"Recreational Plus",pricePence:5750,mode:"single_slot",invitation:true},
  development_wag: {label:"Development WAG",pricePence:10500,mode:"multi_day",invitation:true},
  novice_wag_junior: {label:"Novice WAG Junior",pricePence:10500,mode:"multi_day",invitation:true},
  novice_wag_senior: {label:"Novice WAG Senior",pricePence:10500,mode:"multi_day",invitation:true},
  wag_1: {label:"WAG 1",pricePence:16000,mode:"multi_day",invitation:true},
  wag_2: {label:"WAG 2",pricePence:16000,mode:"multi_day",invitation:true}
});
export const SESSION_PRICES = Object.freeze({stay_and_play:650,adult_child_structured:750,home_education:1000});
export const SESSIONS = Object.freeze({
 recreational_plus:["tue-recreational-plus","thu-recreational-plus","sat-recreational-plus"],
 development_wag:["tue-development-wag","thu-development-wag"],
 novice_wag_junior:["tue-novice-wag-junior","thu-novice-wag-junior"],
 novice_wag_senior:["tue-novice-wag-senior","thu-novice-wag-senior"],
 wag_1:["wed-wag-1","fri-wag-1","sat-wag-1"],
 wag_2:["wed-wag-2","fri-wag-2","sat-wag-2"],
 recreational_4_7:["tue-recreational-4-7","wed-recreational-4-7","thu-recreational-4-7","sat-recreational-4-7"],
 recreational_6_8:["wed-recreational-6-8"],
 recreational_6_12:["sat-recreational-6-12"],
 recreational_7_12:["tue-recreational-7-12","wed-recreational-7-12","thu-recreational-7-12","fri-recreational-7-12","sat-recreational-7-12"]
});
export function sessionsForBooking(programmeCode,selectedClassId){
 const p=PROGRAMMES[programmeCode];if(!p)throw Error("Unknown programme");
 const options=SESSIONS[programmeCode]||[];
 if(p.mode==="multi_day"){if(selectedClassId)throw Error("Multi-day programme cannot select a single day");return [...options];}
 if(!options.includes(selectedClassId))throw Error("Choose a valid weekly class");
 return [selectedClassId];
}
export function validateProgrammeBooking({programmeCode,selectedClassId,age,approvedProgrammes=[]}){
 const p=PROGRAMMES[programmeCode];if(!p)throw Error("Unknown programme");
 if(p.invitation&&!approvedProgrammes.includes(programmeCode))throw Error("Staff invitation required");
 if(p.ageMin!==undefined&&(!Number.isInteger(age)||age<p.ageMin||age>p.ageMax))throw Error("Child is outside the class age range");
 return {programmeCode,amountPence:p.pricePence,sessionIds:sessionsForBooking(programmeCode,selectedClassId)};
}
