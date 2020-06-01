<template>
	<div class="newarticle">
		<h2>{{id? '编辑':'新建'}}文章</h2>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="所属分类" style="width: 600px;">
				<el-select v-model="model.categories" multiple>
					<el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题" style="width: 600px;">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="详情" style="width: 100%;">
				<vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handlerImageAdded"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">提交</el-button>
				<el-button type="infor" @click="$router.push('/articles/list')" v-if="id">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { VueEditor } from 'vue2-editor'
	export default {
		props: {
			id: {}
		},
		data() {
			return {
				model: {},
				categories: []
			}
		},
		components: {
			VueEditor
		},
		methods: {
			// 上传文章，返回图片url地址，优化接口大小
			async handlerImageAdded(file, Editor, cursorLocation, resetUploader) {
				const formData = new FormData();
				formData.append('file', file);
				const res = await this.$http.post('upload', formData);
				Editor.insertEmbed(cursorLocation, 'image', res.data.url);
				resetUploader()
			},
			async save() {
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/articles/${this.id}`, this.model);
				} else {
					res = await this.$http.post('rest/articles', this.model);
				}
				this.$router.push('/articles/list');
				this.$message.success('新建成功!');
			},
			async fetch() {
				const res = await this.$http.get(`rest/articles/${this.id}`);
				this.model = res.data;
			},
			async fetchCategories() {
				const res = await this.$http.get('rest/categories');
				this.categories = res.data;
			}
		},
		created() {
			this.id && this.fetch();
			this.fetchCategories();
		}
	}
</script>

<style>
</style>
