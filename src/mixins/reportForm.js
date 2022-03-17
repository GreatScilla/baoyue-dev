import { queryParams } from "@/util/util.js"
const exports = {
    data() {
        return {
        }
    },
    methods: {
        //导出
        async exports(api, form) {
            console.log(api,form);
            if (this.total > 2000) {
                try {
                    await this.$confirm("只支持导出2000条记录,是否继续？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    });
                    const res = await api(form);
                    const link = document.createElement("a");
                    let blob = new Blob([res.data], {
                        type: "application/vnd.ms-excel;charset=UTF-8",
                    });
                    link.style.display = "none";
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", decodeURI(res.headers["filename"]));
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    this.$message.success("导出成功");
                } catch (error) {
                    this.$message.warning("已取消导出");
                }
            } else {
                try {
                    const res = await api(form);
                    const link = document.createElement("a");
                    let blob = new Blob([res.data], {
                        type: "application/vnd.ms-excel;charset=UTF-8",
                    });
                    link.style.display = "none";
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", decodeURI(res.headers["filename"]));
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    this.$message.success("导出成功");
                } catch (error) {
                    this.$message.warning("导出失败");
                }
            }

        },
        //打印PDF(列表)
        async getPdf(pdfurl, form) {
            if (this.total > 2000) {
                try {
                    await this.$confirm("只支持导出2000条记录,是否继续？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    });
                    let param = {}
                    if (JSON.stringify(form) == "{}") {
                        param = {}
                    } else {
                        param = form
                    }
                    const link = document.createElement('a')
                    link.style.display = 'none'
                    link.target = "_blank"
                    link.href = pdfurl + queryParams(param)
                    console.log(link.href);
                    link.click()
                    // const res = await pdfApi(form);
                    // const link = document.createElement("a");
                    // let blob = new Blob([res.data], {
                    //     type: "application/pdf;charset=UTF-8",
                    // });
                    // link.style.display = "none";
                    // link.href = URL.createObjectURL(blob);
                    // link.setAttribute("download", decodeURI(res.headers["content-disposition"].split("=")[1]));
                    // document.body.appendChild(link);
                    // link.click();
                    // document.body.removeChild(link);
                    // this.$message.success("打印成功");
                } catch (error) {
                    this.$message.warning("已取消打印");
                }
            } else {
                let param = {}
                if (JSON.stringify(form) == "{}") {
                    param = {}
                } else {
                    param = form
                }
                const link = document.createElement('a')
                link.style.display = 'none'
                link.target = "_blank"
                link.href = pdfurl + queryParams(param)
                link.click()
                // try {
                //     const res = await pdfApi(form);
                //     const link = document.createElement("a");
                //     let blob = new Blob([res.data], {
                //         type: "application/pdf;charset=UTF-8",
                //     });
                //     link.style.display = "none";
                //     link.href = URL.createObjectURL(blob);
                //     link.setAttribute("download", decodeURI(res.headers["content-disposition"].split("=")[1]));
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                //     this.$message.success("打印成功");
                // } catch (error) {
                //     this.$message.warning("打印失败");
                // }
            }
        },
        //打印PDF（单据）
        async getPdfBill(pdfIdUrl, id) {
            // let param = {}
            // if (JSON.stringify(param) == "{}") {
            //     param = {}
            // } else {
            //     param = {id:id}
            // }
            const link = document.createElement('a')
            link.style.display = 'none'
            link.target = "_blank"
            link.href =pdfIdUrl + queryParams({id:id})
            link.click()
            this.viewVisible = false;
            this.$refs.multipleCardTable.clearSelection();
            // const res = await pdfIdApi({ id: id });
            // const link = document.createElement("a");
            // let blob = new Blob([res.data], {
            //     type: "application/pdf;charset=UTF-8",
            // });
            // link.style.display = "none";
            // link.href = URL.createObjectURL(blob);
            // link.setAttribute("download", decodeURI(res.headers["content-disposition"].split("=")[1]));
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        },
    }
}
export default exports