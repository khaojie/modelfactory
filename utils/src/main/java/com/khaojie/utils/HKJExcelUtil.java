package com.khaojie.utils;

import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.ss.usermodel.*;

/**
 * Created by khaojie on 2015/12/7.
 */
public class HKJExcelUtil {
    /**
     * 设置主标题样式
     * @param wb
     * @param mainTitleRow
     * @param mainTitleCell
     */
    public static void setMainTitleStyle(Workbook wb, Row mainTitleRow, Cell mainTitleCell){
        CellStyle mainTitleCellStyle = wb.createCellStyle();
        mainTitleCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        mainTitleCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        mainTitleCellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        mainTitleCellStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        Font mainTitlefont = wb.createFont();
        mainTitlefont.setFontHeightInPoints((short)12);
        mainTitlefont.setFontName("Courier New");
        mainTitlefont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        mainTitleCellStyle.setFont(mainTitlefont);
        mainTitleCell.setCellStyle(mainTitleCellStyle);
    }

    public static void setListTitleStyle(Workbook wb, Cell cell){
        Font listTitleFont = wb.createFont();
        listTitleFont.setFontHeightInPoints((short)10);
        listTitleFont.setFontName("Courier New");
        listTitleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        CellStyle listTitleCellStyle = wb.createCellStyle();
        listTitleCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        listTitleCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        listTitleCellStyle.setFont(listTitleFont);
        cell.setCellStyle(listTitleCellStyle);
    }
    /**
     * 创建横向列表标题
     * @param listTitleRow
     * @param titles
     */
    public static void createListTitle(Workbook wb,Row listTitleRow,String [] titles){
        int i = 0 ;
        for(String title:titles){
            Cell cell = listTitleRow.createCell(i);
            cell.setCellValue(title);
            setListTitleStyle(wb,cell);
            i++;
        }
    }
    /**
     * 合并列.
     * @param sheet
     * @param startRow -- 起始行
     * @param lastRow -- 结束行
     * @param startColumn --起始列
     * @param lastColumn --结束列
     */
    public static void meargeCell(Sheet sheet,int startRow,int lastRow,int startColumn,int lastColumn){
        sheet.addMergedRegion(new CellRangeAddress(
                startRow, //first row (0-based)
                lastRow, //last row  (0-based)
                startColumn, //first column (0-based)
                lastColumn  //last column  (0-based)
        ));
    }

    public static void createDataCell(Row dataRow,int startColumn,Object...datas){
        for(int i=0;i<datas.length;i++){
            Cell cell = dataRow.createCell(startColumn);
            if(datas[i] instanceof Double)
                cell.setCellValue(datas[i]==null? 0D : (Double)datas[i]);
            else if(datas[i] instanceof Integer)
                cell.setCellValue(datas[i]==null? 0 : (Integer)datas[i]);
            else if(datas[i] instanceof Long)
                cell.setCellValue(datas[i]==null? 0L : (Long)datas[i]);
            else
                cell.setCellValue(datas[i]==null?"":datas[i].toString());
            startColumn++;
        }
    }

    /**
     * 适用于office07及以上版本
     * @param cell
     * @return
     */
    public static String getStringCellValueFor07(Cell cell) {
        String strCell = "";
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                strCell = cell.getStringCellValue();
                break;
            case Cell.CELL_TYPE_NUMERIC:
                strCell = String.valueOf(Double.valueOf(cell.getNumericCellValue()).longValue());
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                strCell = String.valueOf(cell.getBooleanCellValue());
                break;
            case Cell.CELL_TYPE_BLANK:
                strCell = "";
                break;
            default:
                strCell = "";
                break;
        }
        if (strCell.equals("") || strCell == null) {
            return "";
        }

        return strCell;
    }

    public static String getCellValue(Cell hssfCell){
        if(hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN){
            return String.valueOf( hssfCell.getBooleanCellValue());
        }else if(hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC){
            return String.valueOf( hssfCell.getNumericCellValue());
        }else{
            return String.valueOf( hssfCell.getStringCellValue());
        }
    }
}
