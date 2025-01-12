// // hostSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// export const host = createSlice({
//   name: 'hostAuth',
//   initialState: {
//     selectedCategory: null,
//     selectedType: null,
//     selectedFeature: [],
//     address: [],
//     selectedLocation: null,
//     image: [],
//     selectedBasics: [],
//   },
//   reducers: {
//    hostDatas: (state, action) => {
//     state.selectedCategory= action.payload.selectedCategory?action.payload.selectedCategory:state.selectedCategory;
  
//     state.selectedType = action.payload.selectedType?action.payload.selectedType:state.selectedType;
   
//     state.selectedFeature = action.payload.selectedFeature?action.payload.selectedFeature:state.selectedFeature;
  
//     state.address = action.payload.address? action.payload.address: state.address
  
//     state.selectedLocation = action.payload.selectedLocation? state.address: state.selectedLocation;
  
//     state.image = action.payload.image?action.payload.image:state.image;
  
//     state.selectedBasics= action.payload.selectedBasics?action.payload.selectedBasics:state.selectedBasics;
//    }  

//   }
//   },
// );

// export const {hostDatas,typeData,featureData,addressData,locationData,ImageData,basicsData} = host.actions;

// export default host.reducer;


import { createSlice } from "@reduxjs/toolkit";

export const hostSlice=createSlice({
    name:'host',
    initialState:{
      selectedCategory: "",
          selectedType: "",
          selectedFeature: [],
          address: {},
          selectedLocation: "",
          images: [],
          selectedBasics: {},
          selectedPrice: "",
          description:""
    },
    reducers:{
   
        addSelectedCategory:(state,action)=>{
          state.selectedCategory = action.payload.selectedCategory
        },
        addSelectedType:(state,action)=>{
          state.selectedType = action.payload.selectedType
        },
        addSelectedLocation:(state,action)=>{
          state.selectedLocation = action.payload.selectedLocation
        },
        addAddress:(state,action)=>{
          state.address = action.payload.address
        },
        addImage: (state, action) => {
          const imagesToAdd = Array.isArray(action.payload.images) ? action.payload.images : [action.payload.images];
          console.log(imagesToAdd, "gggggggg");
          state.images = [...state.images, ...imagesToAdd];
        },
        addSelectedBasics:(state,action)=>{
          state.selectedBasics = action.payload.selectedBasics;
        },
        addSelectedFeature:(state,action)=>{
         state.selectedFeature = [...state.selectedFeature,action.payload.selectedFeature];
         console.log(state.selectedFeature);
        },
        addSelectedPrice:(state, action) => {
          console.log(action.payload.selectedPrice);
          state.selectedPrice = parseFloat(action.payload.selectedPrice);
        },
        addDescription:(state,action)=>{
            state.description=action.payload.description 
        },
        reduxClear:(state,action)=>{
           state.selectedCategory=null
           state.selectedType=null
           state.selectedFeature=[]
           state.address=null
           state.selectedLocation=null
           state.images=[]
           state.selectedBasics=null
           state.selectedPrice=null
           state.description=null
        }

    }

})

export const {addSelectedFeature,addSelectedPrice,addSelectedBasics,addImage,addAddress,addSelectedLocation,addSelectedType,addSelectedCategory,addDescription,reduxClear} = hostSlice.actions
export default hostSlice.reducer
