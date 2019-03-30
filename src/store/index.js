import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api'
import { setCookie } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		test:1,
		UserProfile: [],
		PermissionsData: {
            ListData: [],
            queryData: {},
            total: 0
		},
		RolesData: {
            ListData: [],
            queryData: {},
            total: 0
		},
		AdminsData: {
            ListData: [],
            queryData: {},
            total: 0
		},
		UsersData: {
			ListData:[],
			queryData:{},
			total:0
		},
		ProductInfosData:{
			content:[],
			queryData:{},
			total:0,
			page:1,
		}
	},
	mutations: {
		UserProfile(state, data) {
			state.UserProfile = data
		},
		PermissionsData(state, data) {
			state.PermissionsData.ListData = data
		},
		RolesData(state, data) {
			state.RolesData.ListData = data
		},
		AdminsData(state, data) {
			state.AdminsData.ListData = data
		},
		UsersData(state,data){
			state.UsersData.ListData=data
		},
		ProductInfosData(state,data){
			state.ProductInfosData=data
		}
	},
	actions: {

		async getUserProfile({
			state,
			commit
		}) {
			const data = await api.getUserProfile()
			commit('UserProfile', data.data)
		},
		async getPermissions({
			state,
			commit
		},datas) {
			const data = await api.getPermissions(datas)
			commit('PermissionsData', data.data)
		},
		async getRoles({
			state,
			commit
		},datas) {
			const data = await api.getRoles(datas)
			commit('RolesData', data.data)
		},
		async getAdmins({
			state,
			commit
		},datas) {
			const data = await api.getAdmins(datas)
			commit('AdminsData', data.data)
		},
		async getUsers({state,commit},datas){
			const data=await api.getUsers(datas)
			commit("UsersData",data.data)
		},
		async getProductInfos({state,commit},query){
			const data=await api.getProductInfos(query)
			console.log("index",data)
			commit("ProductInfosData",data.data)
		}
	}
})

export default store
