<template>
	<div class="newadminuser">
		<h2>{{id? '编辑':'新建'}}管理员</h2>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="用户名" style="width: 600px;">
				<el-input v-model="model.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" style="width: 600px;">
				<el-input type="password" show-password v-model="model.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">提交</el-button>
				<el-button type="infor" @click="$router.push('/admin_users/list')" v-if="id">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			id: {}
		},
		data() {
			return {
				model: {},
			}
		},
		methods: {
			async save() {
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
				} else {
					res = await this.$http.post('rest/admin_users', this.model);
				}
				this.$router.push('/admin_users/list');
				this.$message.success('操作成功!');
			},
			async fetch() {
				const res = await this.$http.get(`rest/admin_users/${this.id}`);
				this.model = res.data;
			}
		},
		created() {
			this.id && this.fetch();
		}
	}
</script>

<style>
</style>
