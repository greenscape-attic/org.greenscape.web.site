package org.greenscape.web.site;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.greenscape.organization.OrganizationModel;
import org.greenscape.web.common.CommonConstants;
import org.osgi.service.component.annotations.Component;

@Component(property = { "pattern=/site/.*" })
public class SiteFilter implements Filter {

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
	ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String uri = httpRequest.getRequestURI().substring("/site".length());
		if (uri.equalsIgnoreCase("/")) {
			OrganizationModel organizationModel = (OrganizationModel) request
					.getAttribute(CommonConstants.ORGANIZATION);
			// TODO: get default site for the organization
			httpResponse.sendRedirect("greenscape/");
		} else if (uri.endsWith("/")) {
			String newUri = "../index.html";
			httpRequest.getRequestDispatcher(newUri).forward(request, response);
		} else {
			chain.doFilter(request, response);
		}
	}

	@Override
	public void destroy() {
	}

}
