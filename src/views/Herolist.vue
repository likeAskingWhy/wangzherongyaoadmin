<template>
	<div class="herolist">
		<h2>英雄列表</h2>
		<el-table :data="heroes" style="width: 950;">
			<el-table-column prop="_id" label="id" width="300"></el-table-column>
			<el-table-column prop="avatar" label="英雄头像" width="150">
				<template slot-scope="scope">
					<img :src="scope.row.avatar" />
				</template>
			</el-table-column>
			<el-table-column prop="title" label="英雄称号" width="150"></el-table-column>
		  <el-table-column prop="name" label="英雄名称" width="150"></el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push(`/heroes/create/${scope.row._id}`)">编辑</el-button>
					<el-button type="danger" size="small" @click="delmodel(scope.row._id, scope.row.name)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				heroes: []
			}
		},
		methods: {
			async fetch() {
				const res = await this.$http.get('rest/heroes');
				this.heroes = res.data;
			},
			async delmodel(id, name) {
				this.$confirm(`此操作将删除分类"${name}", 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`rest/heroes/${id}`)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.fetch();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			}
		},
		created() {
			this.fetch()
		}
	}
</script>

<style>
	img {
		width: 40px;
		height: 40px;
	}
</style>
