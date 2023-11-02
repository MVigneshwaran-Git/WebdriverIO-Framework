//this class holds the multiple ways to find the elements
class find_elements {
    async find_element(locatortype, value) { //general method deals both css and class level selectors
        var result_element = null
        switch (locatortype) {
            case ('id'):
                try {
                    var processed_value = '#' + value;
                    return result_element = await $(processed_value);
                }
                catch (Exception) {
                    return result_element;
                }
            case ('xpath'):
                try {
                    return result_element = await $(value);
                }
                catch (Exception) {
                    return result_element;
                }
            default:
                return result_element;
        }
    }
    //find element by css value
    async find_element_by_css(locatortype, value) {
        //var result_element = await this.find_element(locatortype,value);
        try {
            return result_element = await $(value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    //find element by linktext value
    async find_element_by_linktext(value) {
        var result_element = null
        var value = '=' + value //------------> bases on value it finds the webelement
        try {
            return result_element = await $(value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    //find element by partial linktext value
    async find_element_by_partial_linktext(value) {
        var result_element = null
        var value = '*=' + value
        try {
            return result_element = await $(value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_text_presentIn_tag(tag_name, value) {
        var result_element = null
        var value = '=' + value
        try {
            return result_element = await $(tag_name + value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_text_containedIn_tag(tag_name, value) {
        var result_element = null
        var value = '*=' + value
        try {
            return result_element = await $(tag_name + value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_tag(tag_name) {
        var result_element = null
        var value = '<' + tag_name + ' />'
        try {
            return result_element = await $(value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_attribute(tag_attribute, attribute_value) {
        var result_element = null
        var value = tag_attribute + '=' + attribute_value;
        try {
            return result_element = await $(value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_xpath(xpath_value) {
        var result_element = null
        try {
            return result_element = await $(xpath_value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_by_id(id_value) {
        var result_element = null
        try {
            var processed_value = '#' + id_value;
            return result_element = await $(processed_value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_with_tag_and_value(tag_name, value) {
        var result_element = null
        try {
            var processed_value = tag_name + '#' + value;
            return result_element = await $(processed_value);
        }
        catch (Exception) {
            return result_element;
        }
    }
    async find_element_with_tag_and_classname(tag_name, value) {
        var result_element = null
        try {
            var processed_value = tag_name + '.' + value;
            return result_element = await $(processed_value);
        }
        catch (Exception) {
            return result_element;
        }
    }



}
module.exports = new find_elements();