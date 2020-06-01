<template>
	<div class="newitem">
		<h2>{{id? '编辑':'新建'}}物品</h2>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称" style="width: 600px;">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="类型" style="width: 600px;">
				<el-select v-model="model.kind">
					<el-option v-for="item in kind" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上传图标">
				<el-upload class="avatar-uploader"
				  :action="uploadURL"
				  :show-file-list="false"
					:headers="getAuthHeaders()"
				  :on-success="afterUpload">
				  <img v-if="model.icon" :src="model.icon" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">提交</el-button>
				<el-button type="infor" @click="$router.push('/items/list')" v-if="id">返回</el-button>
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
				model: {
					name: '',
					icon: ''
				},
				kind: ['打野', '攻击', '法术', '防御', '移动', '辅助']
			}
		},
		methods: {
			afterUpload(res) {
				this.model.icon = res.url;
			},
			async save() {
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/items/${this.id}`, this.model);
				} else {
					res = await this.$http.post('rest/items', this.model);
				}
				this.$router.push('/items/list');
				this.$message.success('新建成功!');
			},
			async fetch() {
				const res = await this.$http.get(`rest/items/${this.id}`);
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
