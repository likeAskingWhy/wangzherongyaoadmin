<template>
	<div class="categorylist">
		<h2>分类列表</h2>
		<el-table :data="items" style="width: 1050;">
			<el-table-column prop="_id" label="id" width="350"></el-table-column>
			<el-table-column prop="parent.name" label="上级分类" width="250"></el-table-column>
		  <el-table-column prop="name" label="分类名称" width="250"></el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push(`/categories/create/${scope.row._id}`)">编辑</el-button>
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
				items: []
			}
		},
		methods: {
			async fetch() {
				const res = await this.$http.get('rest/categories');
				this.items = res.data;
			},
			async delmodel(id, name) {
				this.$confirm(`此操作将删除分类"${name}", 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`rest/categories/${id}`)
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
</style>
