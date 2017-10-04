package com.khaojie.design.web.excel;

import com.fd.util.MyUtils;
import com.khaojie.pojo.Product;
import com.khaojie.utils.HKJExcelUtil;
import com.khaojie.vo.paintscheme.download.ColorVo;
import com.khaojie.vo.paintscheme.download.PartVo;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class PaintSchemeExcelView extends AbstractXlsView {

    @Override
    protected void buildExcelDocument(Map<String, Object> map, Workbook wb, HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<ColorVo> voList = null;
        if(MyUtils.isNotEmpty(map)){
            voList =(List<ColorVo>) map.get("colorVos");
        }else
            voList = new ArrayList<>();
        Product prod = (Product) map.get("prod");
        Map<String,Integer> partOccurMap = (Map)map.get("partOccur");
        Sheet sheet1 = wb.createSheet("Sheet1");
        //生成主标题行。
        Row mainTitleRow = sheet1.createRow(0);
        //生成主标题列。
        Cell mainTitleCell = mainTitleRow.createCell(0);
        mainTitleCell.setCellValue("Paint Scheme:"+prod.getName());
        //设置主标题样式
        HKJExcelUtil.setMainTitleStyle(wb, mainTitleRow, mainTitleCell);
        //主标题第一行,合并2列
        HKJExcelUtil.meargeCell(sheet1, 0, 0, 0, 1);
        //生成列表标题行
        Row listTitleRow = sheet1.createRow(1);
        HKJExcelUtil.createListTitle(wb,listTitleRow, new String[]{
                "Color Code","Part No"
        });

        CellStyle multiColorCellStyle = wb.createCellStyle();
        multiColorCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        multiColorCellStyle.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        multiColorCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        multiColorCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

        CellStyle centerCellStyle = wb.createCellStyle();
        centerCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        centerCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

        List<String> colorRankList = new ArrayList<>();
        AtomicInteger dataRowIndex = new AtomicInteger(2);//从第三行开始加载数据
        voList.stream().forEach(vo->{
            Collections.sort(vo.getParts(), Comparator.comparing(PartVo::getPartNo));
            vo.getParts().stream().forEach(part->{
                Row dataRow = sheet1.createRow(dataRowIndex.get());
                HKJExcelUtil.createDataCell(dataRow, 0,
                       vo.getColorNo(),part.getPartNo()
                );
                dataRow.getCell(0).setCellStyle(centerCellStyle);
                if(partOccurMap.get(part.getPartNo())>1)
                    dataRow.getCell(1).setCellStyle(multiColorCellStyle);
                else
                    dataRow.getCell(1).setCellStyle(centerCellStyle);
                dataRowIndex.addAndGet(1);
            });
            colorRankList.add(vo.getColorNo()+","+vo.getPartSize());
        });
        //生成列表标题行
        Row listColorRankTileRow = sheet1.createRow(dataRowIndex.get());
        HKJExcelUtil.createListTitle(wb,listColorRankTileRow, new String[]{
                "Color Code","Part Size"
        });
        dataRowIndex.addAndGet(1);
        for(String str:colorRankList){
            String colorNo = str.split(",")[0];
            String partSize = str.split(",")[1];
            Row dataRow = sheet1.createRow(dataRowIndex.get());
            HKJExcelUtil.createDataCell(dataRow, 0,
                    colorNo,partSize
            );
            dataRow.getCell(0).setCellStyle(centerCellStyle);
            dataRow.getCell(1).setCellStyle(centerCellStyle);
            dataRowIndex.addAndGet(1);
        }

        sheet1.setColumnWidth(0, 5000);
        sheet1.setColumnWidth(1, 5000);

        String fileName = "Paint Scheme:"+prod.getName()+".xls";//文件名
        fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");//名称字符编码
        response.setContentType("application/vnd.ms-excel;charset=gb2312");
        response.setHeader("Content-disposition", "attachment;fileName=" + fileName);
        OutputStream os = response.getOutputStream();
        wb.write(os);
        os.flush();
        os.close();
    }
}
