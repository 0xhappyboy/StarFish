import { ResizeBox, Typography } from '@arco-design/web-react';

interface Props { }
const IndexPage: React.FC<Props> = ({ }) => {
    // top pane
    const topPane = (<Typography.Paragraph>Top</Typography.Paragraph>);
    // bottom pane
    const bottomPane = (
        <div>
            <ResizeBox.Split
                direction='horizontal'
                panes={[
                    <Typography.Paragraph >
                        <div style={{ position: 'absolute', height: '100%', backgroundColor: 'red' }}></div>
                    </Typography.Paragraph>,
                    <Typography.Paragraph  >
                        <div style={{ position: 'absolute', height: '100%', backgroundColor: 'red' }}></div>
                    </Typography.Paragraph>,
                ]}
            ></ResizeBox.Split>
        </div>
    );

    return (
        <>
            <div>
                <ResizeBox.Split
                    direction='vertical'
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    panes={[topPane, bottomPane]}
                ></ResizeBox.Split>
            </div>
        </>
    );
};

export default IndexPage;