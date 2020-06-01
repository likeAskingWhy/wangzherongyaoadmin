<template>
	<div class="newhero">
		<h2>{{id? '编辑':'添加'}}英雄</h2>
		<el-form label-width="120px" @submit.native.prevent="save" style="width: 1000px;">
			<el-tabs value="skills" type="border-card">
				<el-tab-pane label="基本信息" name="basic">
					<el-form-item label="上传头像">
						<el-upload class="avatar-uploader"
						  :action="uploadURL"
						  :show-file-list="false"
							:headers="getAuthHeaders()"
						  :on-success="afterUpload">
						  <img v-if="model.avatar" :src="model.avatar" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="英雄名称" style="width: 100%;">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="英雄称号" style="width: 100%;">
						<el-input v-model="model.title"></el-input>
					</el-form-item>
					<el-form-item label="职业定位" style="width: 100%;">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="难度" style="width: 100%;">
						<el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.difficult"></el-rate>
					</el-form-item>
					<el-form-item label="技能" style="width: 100%;">
						<el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
					</el-form-item>
					<el-form-item label="攻击" style="width: 100%;">
						<el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
					</el-form-item>
					<el-form-item label="生存" style="width: 100%;">
						<el-rate style="margin-top: 0.7rem;" :max="10" show-score v-model="model.scores.survive"></el-rate>
					</el-form-item>
					<el-form-item label="顺风出装">
						<el-select v-model="model.items1" multiple>
							<el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="逆风出装">
						<el-select v-model="model.items2" multiple>
							<el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="使用技巧">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>
					<el-form-item label="对抗技巧">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="英雄技能" name="skills">
					<el-button type="infor" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
					<el-row type="flex" style="flex-wrap: wrap;">
						<el-col :md="12" v-for="(item, i) in model.skills" :key="i">
							<el-form-item :label="i>0? '技能' + i : '被动技能'">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="技能图标">
								<el-upload class="avatar-uploader"
								  :action="uploadURL"
								  :show-file-list="false"
									:headers="getAuthHeaders()"
								  :on-success="res => $set(item, 'icon', res.url)">
								  <img v-if="item.icon" :src="item.icon" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="技能描述">
								<el-input type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input type="textarea" v-model="item.tips"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<!-- <el-form-item label="最佳队友">
				<el-input type="textarea" v-model="usageTips"></el-input>
			</el-form-item> -->
			<el-form-item style="margin-top: 1rem;">
				<el-button type="primary" native-type="submit">提交</el-button>
				<el-button type="infor" @click="$router.push('/heroes/list')" v-if="id">返回</el-button>
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
				categories: [],
				items: [],
				model: {
					name: '',
					avatar: '',
					scores: {
						difficult: 0
					}
				}
			}
		},
		methods: {
			afterUpload(res) {
				this.model.avatar = res.url;
			},
			async save() {
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
				} else {
					res = await this.$http.post('rest/heroes', this.model);
				}
				this.$router.push('/heroes/list');
				this.$message.success('操作成功!');
			},
			async fetch() {
				const res = await this.$http.get(`rest/heroes/${this.id}`);
				this.model = Object.assign({}, this.model, res.data);
			},
			async fetchCategories() {
				const res = await this.$http.get(`rest/categories`);
				this.categories = res.data;
			},
			async fetchItems() {
				const res = await this.$http.get(`rest/items`);
				this.items = res.data;
			}
		},
		created() {
			this.fetchItems();
			this.fetchCategories();
			this.id && this.fetch();
		}
	}
</script>

