package com.khaojie.bo.part;

import com.khaojie.pojo.Part;
import com.khaojie.pojo.PartColor;

import java.util.List;

public interface IPartBo {
    void saveParts(List<Part> parts);

    void savePartColors(List<PartColor> partColors);
}
