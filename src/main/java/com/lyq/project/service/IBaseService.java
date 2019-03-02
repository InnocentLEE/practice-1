package com.lyq.project.service;

import com.lyq.project.common.LYQRequest;
import com.lyq.project.common.LYQResponse;
import com.lyq.project.dto.LoginDto;

import javax.servlet.http.HttpSession;

public interface IBaseService {
    LYQResponse login(HttpSession session, LYQRequest<LoginDto> request);
    LYQResponse getMenu(int type);
    LYQResponse HasResource(int type);
}
