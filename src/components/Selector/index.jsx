import { Select, Tag } from "@arco-design/web-react"
import './index.css'

const Option = Select.Option

const SelectorComponent = ({ item, mode, setSelectedData }) => {
    const placeholder = item.title === '域名' ? "全部域名(含删除域名)" : "请选择"

    const baseProps = {
        addBefore: item.title,
        placeholder: placeholder,
        style: {
            width: item.title === '域名' ? 500 : 300,
            border: "1px solid #dedede",
            borderRadius: 5
        },
        mode,
        onChange: (value) => {
            setSelectedData(value)
        }
    }
    return (
        <Select
            {...baseProps}
            renderTag={mode ? ({ label, value, closable, onClose}, index, valueList) => {
                const tagCount = valueList.length

                if (tagCount > 1) {
                    return index === 0 ? (
                        <span style={{marginLeft: 8}}>{`已选择${tagCount}项`}</span>
                    ) : null
                }

                return (
                    <Tag
                        color="arcoblue"
                        closable={closable}
                        onClose={onClose}
                        style={{ margin: '2px 6px 2px 0'}}
                    >
                        {label}
                    </Tag>
                )
            } : undefined}
        >
            {item.options.map((option, _) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
            ))}
        </Select>
    )
}

export default SelectorComponent